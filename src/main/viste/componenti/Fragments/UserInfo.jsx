import React from 'react';
import * as Components from "../ChatComponents";

const UserInfo = ({ }) => {
    return (
        <Components.ProfileInformations style={{transition: 'all 0.3s'}}>
            <Components.userInfoProfilePic style={{backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png)`}} dotColor={"green"} />
            <div style={{marginLeft: '30px', textTransform: 'uppercase', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Components.listItemName>Microsoft</Components.listItemName>
                <Components.listItemInfo>business@microsoft.com</Components.listItemInfo>
            </div>
        </Components.ProfileInformations>
    );
};

export default UserInfo;