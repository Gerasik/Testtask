import "./styles.scss"

interface Props {
  name: string
  checked?: boolean
  onChange: (name: string) => void
}

const Item = ({ checked, name, onChange }: Props) => {
  return (
    <div className="selector-item">
      <input
        type="checkbox"
        id={name}
        checked={checked}
        onChange={() => onChange(name)}
        className="checkbox-input"
      />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

export default Item
