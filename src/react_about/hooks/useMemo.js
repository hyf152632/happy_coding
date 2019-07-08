// 使用 useMemo 记忆昂贵计算
import { useMemo } from 'react'

function Button({ color, children }) {
  const textColor = useMemo(() => slowlyCalculateTextColor(color), [color])

  return <button className={'Button-' + color + ' Button-text-' + textColor}>{children}</button>
}
