import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/material/Icon';

function MaterialMenuItem({text} ) {
    return (
        <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
}

export default MaterialMenuItem;