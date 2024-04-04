import { Close, House, MoreVert } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, TextField } from "@mui/material";
import useBoolean from "../hooks/useBoolean";
import { useCallback, useEffect, useState } from "react";
import ListItemLink from "./ListItemLink";

export interface LayoutProps {
  menu?: MenuItem[];
  children?: React.ReactNode;
  onMiniFormSubmit?: (name: string) => any;
  miniFormLabel?: string;
  menuHeaders?: MenuHeader[];
}

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export interface MenuHeader {
  label: string;
  path: string;
  icon: React.ReactNode;
  actions?: {
    icon: React.ReactNode;
    label: string;
    onAct: () => void;
  }[];
}

export default function Layout({ menu, onMiniFormSubmit, miniFormLabel, children, menuHeaders }: LayoutProps) {
  const [miniFormOpen, { on: openMiniForm, off: closeMiniForm }] = useBoolean(false);
  const [miniFormValue, setMiniFormValue] = useState<string>("");
  const [miniFormError, setMiniFormError] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const handleAct = useCallback((action?: () => void) => () => {
    action?.();
    setMenuAnchorEl(null);
  }, []);

  const handleMiniFormSubmit = useCallback(async () => {
    if (onMiniFormSubmit) {
      try {
        await onMiniFormSubmit(miniFormValue)
        closeMiniForm();
      } catch (error) {
        setMiniFormError(true);
      }
    } else {
      closeMiniForm();
    }
  }, [closeMiniForm, miniFormValue, onMiniFormSubmit]);
  const handleMiniFormSubmitWithForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleMiniFormSubmit();
  }, [handleMiniFormSubmit]);

  useEffect(() => {
    if (!miniFormOpen) {
      setMiniFormError(false);
      setMiniFormValue("");
    }
  }, [miniFormOpen]);

  return <Stack direction="row" sx={{ height: "100vh" }}>
    <Box sx={{ width: 300, borderRight: 1, borderColor: "divider", flexShrink: 0 }}>
      <Stack direction="column" sx={{ height: "100%" }}>
        <List disablePadding>
          <ListItem disablePadding sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemLink to="/">
              <ListItemIcon><House /></ListItemIcon>
              <ListItemText>CobbledBuilder</ListItemText>
            </ListItemLink>
          </ListItem>
        </List>
        {menuHeaders && <List disablePadding>
          {menuHeaders.map(({ icon, label, path, actions }) =>
            <ListItem sx={{ borderBottom: 1, borderColor: "divider" }} key={label} disablePadding>
              <ListItemLink to={path} end>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </ListItemLink>
              {!!actions?.length && <>
                <ListItemButton sx={{ flexGrow: 0, alignSelf: "stretch" }} onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                  <ListItemIcon sx={{ minWidth: "unset" }}>
                    <MoreVert />
                  </ListItemIcon>
                </ListItemButton>
                <Menu
                  id="basic-menu"
                  anchorEl={menuAnchorEl}
                  open={!!menuAnchorEl}
                  onClose={handleAct()}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {actions.map(({ icon, label, onAct }) =>
                    <MenuItem key={label} onClick={handleAct(onAct)}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{label}</ListItemText>
                    </MenuItem>
                  )}
                </Menu>
              </>}
            </ListItem>
          )}
        </List>}
        <List sx={{ flexGrow: 1, overflowY: "auto" }} disablePadding>
          {menu?.map(({ label, path, icon, onIconClick }) =>
            <ListItem disablePadding key={label}>
              <ListItemLink to={path}>
                <ListItemText sx={{ textTransform: "capitalize" }}>{label}</ListItemText>
              </ListItemLink>
              {icon && <ListItemButton sx={{ flexGrow: 0, alignSelf: "stretch" }}>
                <ListItemIcon onClick={onIconClick} sx={{ minWidth: "unset" }}>{icon}</ListItemIcon>
              </ListItemButton>}
            </ListItem>
          )}
        </List>
        {onMiniFormSubmit && <List disablePadding sx={{ borderTop: 1, borderColor: "divider" }}>
          {miniFormOpen && <>
            <ListItem>
              <ListItemText primary={miniFormLabel} />
              <ListItemButton onClick={closeMiniForm} sx={{ flexGrow: 0 }}>
                <Close />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <Box component="form" onSubmit={handleMiniFormSubmitWithForm} sx={{ width: "100%" }}>
                <TextField
                  autoFocus
                  error={miniFormError}
                  fullWidth
                  label="name"
                  value={miniFormValue}
                  onChange={(e) => setMiniFormValue(e.target.value)} />
              </Box>
            </ListItem>
          </>}
          <ListItem disablePadding>
            <ListItemButton onClick={!miniFormOpen ? openMiniForm : handleMiniFormSubmit}>
              <ListItemText sx={{ textAlign: "center" }}>+</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>}
      </Stack>
    </Box >
    <Box p={2} flexGrow={1} overflow="auto">
      {children}
    </Box>
  </Stack >
}