import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { CheckedContext } from "../App"
import Item from "../Item"
import { useClickOutside } from "./hooks"

import "./styles.scss"

interface Props {
  items: string[]
}

const Selector = ({ items }: Props) => {
  const [isOpen, setOpen] = useState(false)
  const { checkedList, updateCheckedList, resetList, selectAll } =
    useContext(CheckedContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [searchValue, setSearchValue] = useState("")
  const [itemList, setItemList] = useState(items)

  const openSelector = () => {
    setOpen(true)
  }

  const closeSelector = () => {
    setOpen(false)
    setSearchValue("")
  }

  useClickOutside(buttonRef, closeSelector)

  useEffect(() => {
    if (searchValue) {
      setItemList(
        items.filter((item) =>
          item.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        )
      )
    } else {
      setItemList(items)
    }
  }, [items, searchValue])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const onAnyChange = useCallback(() => {
    if (items.length === checkedList.length) {
      resetList()
    } else {
      selectAll(items)
    }
  }, [checkedList.length, items, resetList, selectAll])

  const onEnterPress = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      closeSelector()
    }
  }

  return (
    <button
      type="button"
      className="selector"
      onClick={openSelector}
      ref={buttonRef}
    >
      <div className="selector-container">
        {isOpen ? (
          <input
            type="text"
            ref={inputRef}
            className="selector-input"
            value={searchValue}
            onKeyDown={onEnterPress}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        ) : (
          <p
            className="selector-label"
            title={
              !checkedList.length ? "Please select" : checkedList.join(", ")
            }
          >
            {!checkedList.length ? "Please select" : checkedList.join(", ")}
          </p>
        )}
      </div>
      {isOpen && (
        <ul className="selector-list">
          <li className="selector-list-item">
            <Item
              name="Any"
              onChange={onAnyChange}
              checked={items.length === checkedList.length}
            />
          </li>
          {itemList.map((i) => (
            <li key={i} className="selector-list-item">
              <Item
                name={i}
                onChange={updateCheckedList}
                checked={checkedList.some((j) => j === i)}
              />
            </li>
          ))}
        </ul>
      )}
    </button>
  )
}

export default Selector
