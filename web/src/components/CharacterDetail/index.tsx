import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

import { Container, CharacterContainer } from './styles';

type IComicData = {
  resourceURI: string;
  name: string;
};

type ICharacterData = {
  id: number;
  name: string;
  description: string;
  comics: IComicData[];
  thumbnail: {
    path: string;
    extension: string;
  };
};

type ICharacterParam = {
  id: string;
};
const CharacterDetailContainer: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterData>();

  const params = useParams<ICharacterParam>();
  const history = useHistory();

  const handleSelectComic = useCallback(
    (uri: string) => {
      const comic_id = uri.split('/comics/')[1];
      history.push(`/dashboard/comics/${comic_id}`);
    },
    [history],
  );

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/${params.id}?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839`,
      )
      .then(response => {
        setSelectedCharacter({
          id: response.data.data.results[0].id,
          name: response.data.data.results[0].name,
          description: response.data.data.results[0].description,
          comics: response.data.data.results[0].comics.items,
          thumbnail: response.data.data.results[0].thumbnail,
        });
      });
  }, [params.id]);

  return (
    <Container>
      {selectedCharacter && (
        <CharacterContainer>
          <img
            src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
            alt={`${selectedCharacter.name}`}
          />
          <h1>{selectedCharacter.name}</h1>

          <p>{selectedCharacter.description}</p>

          <ul className="comics">
            <p>Comics:</p>
            {selectedCharacter.comics.length === 0 ? (
              <p>Nenhuma comic registrada</p>
            ) : (
              <>
                {selectedCharacter.comics.map(comic => (
                  <li
                    onClick={() => handleSelectComic(comic.resourceURI)}
                    key={comic.name}
                  >
                    {comic.name}
                  </li>
                ))}
              </>
            )}
          </ul>
        </CharacterContainer>
      )}
    </Container>
  );
};

export default CharacterDetailContainer;
