import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';

const ProfileSidebar = (props) => {
  return (
    <Box as="aside">
      <img
        src={props.userPhoto}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default ProfileSidebar;
