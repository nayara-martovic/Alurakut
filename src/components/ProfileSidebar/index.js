import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

const ProfileSidebar = (props) => {
  return (
    <Box as="aside">
      <img
        src={props.user.imageUrl}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <h4>{props.user.name}</h4>
      <p>
        <a className="boxLink" href={`https://github.com/${props.user.userName}`}>
          @{props.user.userName}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default ProfileSidebar;
