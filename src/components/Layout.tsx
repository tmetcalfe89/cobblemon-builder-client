import { Close, House } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from "@mui/material";
import useBoolean from "../hooks/useBoolean";
import { useCallback, useEffect, useState } from "react";
import ListItemLink from "./ListItemLink";

export interface LayoutProps {
  menu?: MenuItem[];
  children?: React.ReactNode;
  onMiniFormSubmit?: (name: string) => Promise<boolean>;
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
}

export default function Layout({ menu, onMiniFormSubmit, miniFormLabel, children, menuHeaders }: LayoutProps) {
  const [miniFormOpen, { on: openMiniForm, off: closeMiniForm }] = useBoolean(false);
  const [miniFormValue, setMiniFormValue] = useState<string>("");
  const [miniFormError, setMiniFormError] = useState<boolean>(false);

  const handleMiniFormSubmit = useCallback(async () => {
    if (onMiniFormSubmit) {
      if (await onMiniFormSubmit(miniFormValue)) {
        closeMiniForm();
      } else {
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
    <Box sx={{ width: 300, borderRight: 1, borderColor: "divider" }}>
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
          {menuHeaders.map(({ icon, label, path }) =>
            <ListItem disablePadding sx={{ borderBottom: 1, borderColor: "divider" }} key={label}>
              <ListItemLink to={path}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </ListItemLink>
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