import { useEffect, useState } from 'react'
import { NavigationBar } from '../../components/NavigationBar'
import { Container } from '../../styles/pages/dashboard/index'

export default function Dashboard() {
  const [characters, setCharacters] = useState()

  useEffect(() => {
    fetch(
      'https://gateway.marvel.com:443/v1/public/characters?apikey=cde83a3d3993109b972960f7ba6dee7a&hash=1d08a42f328a29f054d36a1187ca314b&ts=1614357839'
    )
      .then(response => {
        return response.json()
      })
      .then(responseParsed => {
        setCharacters(responseParsed.data.results)
      })
  }, [])

  return (
    <Container>
      <NavigationBar />

      {characters &&
        characters.map(character => {
          return (
            <div>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt=""
              />
            </div>
          )
        })}
    </Container>
  )
}
