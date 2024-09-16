import React from 'react';
import * as Components from "../ChatComponents";

const UserInfo = ({ }) => {
    return (
        <Components.ProfileInformations style={{transition: 'all 0.3s'}}>
            <Components.userInfoProfilePic style={{backgroundImage: `url(https://us-tuna-sounds-images.voicemod.net/07c58346-18e5-4c50-93c4-608c8b7729e8-1725480637335.png)`}} dotColor={"green"} />
            <div>
                <Components.listItemName>Federico Bugni</Components.listItemName>
                <Components.listItemInfo>
                    <Components.SkillChip label="React" />
                    <Components.SkillChip label="Node" />
                    <Components.SkillChip label="MongoDB" />
                    <Components.SkillChip label="Express" />
                </Components.listItemInfo>
            </div>
            <Components.UserInfoSideInfo>
                <Components.SideInfoElement>
                    <h1>9</h1>
                    <h5>CHAT DA LEGGERE</h5>
                </Components.SideInfoElement>
            </Components.UserInfoSideInfo>
        </Components.ProfileInformations>
    );
};

export default UserInfo;