import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { Container, ComicContainer } from './styles';

type ICharacterData = {
  name: string;
  resourceURI: string;
};

type IComicData = {
  id: number;
  title: string;
  description: string;
  characters: ICharacterData[];
  thumbnail: {
    path: string;
    extension: string;
  };
};

type IComicParam = {
  id: string;
};
const ComicDetailContainer: React.FC = () => {
  const [selectedComic, setSelectedComic] = useState<IComicData>();

  const params = useParams<IComicParam>();
  const history = useHistory();

  const handleSelectCharacter = useCallback(
    (uri: string) => {
      const comic_id = uri.split('/characters/')[1];
      history.push(`/dashboard/characters/${comic_id}`);
    },
    [history],
  );

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/comics/${params.id}?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839`,
      )
      .then(response => {
        setSelectedComic({
          id: response.data.data.results[0].id,
          characters: response.data.data.results[0].characters.items,
          title: response.data.data.results[0].title,
          description: response.data.data.results[0].description,
          thumbnail: response.data.data.results[0].thumbnail,
        });
      });
  }, [params.id]);

  return (
    <Container>
      {selectedComic && (
        <ComicContainer>
          <img
            src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
            alt={`${selectedComic.title}`}
          />
          <h1>{selectedComic.title}</h1>

          <p>{selectedComic.description}</p>

          <ul>
            Personagens:
            {selectedComic.characters.length === 0 ? (
              <p>Nenhum personagem cadastrado</p>
            ) : (
              <>
                {selectedComic.characters.map(character => (
                  <li
                    key={character.name}
                    onClick={() => handleSelectCharacter(character.resourceURI)}
                  >
                    {character.name}
                  </li>
                ))}
              </>
            )}
          </ul>
        </ComicContainer>
      )}
    </Container>
  );
};

export default ComicDetailContainer;
