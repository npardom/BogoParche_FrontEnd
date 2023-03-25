import { useParams } from 'react-router-dom';

function PageAct() {
  const { slug } = useParams();

  return (
      <div>
        <h1>PageAct - {slug}</h1>
      </div>
  );
}

export default PageAct