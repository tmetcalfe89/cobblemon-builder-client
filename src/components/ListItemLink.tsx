import { ListItemButton } from "@mui/material"
import { NavLink } from "react-router-dom"

export interface ListItemLinkProps {
  children?: React.ReactNode;
  to: string;
  end?: boolean;
}

export default function ListItemLink({ children, to, end }: ListItemLinkProps) {
  return <ListItemButton component={NavLink} to={to} end={end}>{children}</ListItemButton>
}