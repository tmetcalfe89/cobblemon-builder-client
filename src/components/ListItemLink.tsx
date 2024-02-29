import { ListItemButton } from "@mui/material"
import { NavLink } from "react-router-dom"

interface ListItemLinkProps {
  children?: React.ReactNode
  to: string
}

export default function ListItemLink({ children, to }: ListItemLinkProps) {
  return <ListItemButton component={NavLink} to={to} end>{children}</ListItemButton>
}