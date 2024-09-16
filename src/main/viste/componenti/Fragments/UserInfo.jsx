import React from 'react';
import * as Components from "../ChatComponents";

const UserInfo = ({ }) => {
    return (
        <Components.ProfileInformations style={{transition: 'all 0.3s'}}>
            <Components.userInfoProfilePic style={{backgroundImage: `url(https://marketplace.canva.com/EAFqNrAJpQs/1/0/1600w/canva-neutral-pink-modern-circle-shape-linkedin-profile-picture-WAhofEY5L1U.jpg)`}} dotColor={"green"} />
            <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start'}}>
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