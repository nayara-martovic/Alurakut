import { ProfileRelationsBoxWrapper } from './styles';

const ProfileRelationsBox = (props) => {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.list.length})
      </h2>
      <ul>
        {props.list.slice(0,3).map((item) => {
          return (
            <li key={item.id}>
              <a href={`${props.href}${item.title}`}>
                <img src={item.imageUrl} />
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
};

export default ProfileRelationsBox;