import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { getProductions } from '#/os/store'
import { OsCard, OsLabel } from '#/os/OsShell'

export const Route = createFileRoute('/os/calendar')({ component: CalendarPage })

// Business timezone is Asia/Dhaka regardless of the viewer's location — a
// shoot booked for the 14th must show on the 14th whether viewed from Dhaka
// or anywhere else. See the Filix OS calendar bug this pattern avoids.
const BUSINESS_TZ = 'Asia/Dhaka'

function dhakaDateKey(iso: string) {
  const d = new Date(iso + 'T12:00:00Z') // noon UTC avoids DST/rounding edge cases entirely
  return new Intl.DateTimeFormat('en-CA', { timeZone: BUSINESS_TZ }).format(d) // YYYY-MM-DD
}

function CalendarPage() {
  const productions = getProductions()
  const [cursor, setCursor] = useState(() => new Date())

  const shootsByDay = useMemo(() => {
    const map = new Map<string, typeof productions>()
    for (const p of productions) {
      if (!p.shootDate) continue
      const key = dhakaDateKey(p.shootDate)
      map.set(key, [...(map.get(key) ?? []), p])
    }
    return map
  }, [productions])

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startWeekday = firstOfMonth.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  const monthLabel = cursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div>
      <OsLabel>Studio OS</OsLabel>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[24px]" style={{ color: '#f0f0f1' }}>
          Calendar
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setCursor(new Date(year, month - 1, 1))} className="text-[13px]" style={{ color: '#8a8a8f' }}>
            ←
          </button>
          <span className="text-[13px] tabular" style={{ color: '#f0f0f1' }}>
            {monthLabel}
          </span>
          <button onClick={() => setCursor(new Date(year, month + 1, 1))} className="text-[13px]" style={{ color: '#8a8a8f' }}>
            →
          </button>
        </div>
      </div>

      <div className="text-[10px] mb-2" style={{ color: '#5a5a5e' }}>
        All dates shown in studio time (Asia/Dhaka)
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-[10px] uppercase tracking-wide text-center py-1" style={{ color: '#5a5a5e' }}>
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />
          const key = new Intl.DateTimeFormat('en-CA').format(date)
          const shoots = shootsByDay.get(key) ?? []
          const isToday = key === new Intl.DateTimeFormat('en-CA').format(new Date())
          return (
            <OsCard key={i} className="min-h-[92px] flex flex-col">
              <div
                className="text-[12px] tabular"
                style={{ color: isToday ? '#e08a6f' : '#8a8a8f' }}
              >
                {date.getDate()}
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {shoots.map((s) => (
                  <Link
                    key={s.id}
                    to="/os/productions/$id"
                    params={{ id: s.id }}
                    className="text-[10px] leading-tight px-1.5 py-1 rounded-sm truncate"
                    style={{ background: 'rgba(157,45,25,0.18)', color: '#e08a6f' }}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </OsCard>
          )
        })}
      </div>
    </div>
  )
}
