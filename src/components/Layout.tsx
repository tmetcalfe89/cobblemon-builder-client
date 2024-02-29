import { Close, House } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField } from "@mui/material";
import useBoolean from "../hooks/useBoolean";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export interface LayoutProps {
  menu?: MenuItem[];
  children: React.ReactNode;
  onMiniFormSubmit?: (name: string) => Promise<boolean>;
  miniFormLabel?: string;
}

export interface MenuItem {
  label: string;
  path: string;
}

export default function Layout({ menu, onMiniFormSubmit, miniFormLabel, children }: LayoutProps) {
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
            <ListItemButton>
              <ListItemIcon><House /></ListItemIcon>
              <ListItemText>CobbledBuilder</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <List sx={{ flexGrow: 1 }} disablePadding>
          {menu?.map(({ label, path }) =>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={path}>
                <ListItemText>{label}</ListItemText>
              </ListItemButton>
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
    <Box>
      {children}
    </Box>
  </Stack >
}