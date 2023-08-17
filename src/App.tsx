import "./App.css";
import { useEffect, useState } from "react";
import { MantineProvider, Title, Card, Image, Text } from "@mantine/core";
function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=10")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
      <MantineProvider theme={{colorScheme: 'dark'}}>
        <Title order={1}>Top Anime</Title>
        <ul style={{ listStyle: "none" }}>
          {data["data"]?.map((anime) => (
            <li key={anime.mal_id}>
              <Card shadow="sm" padding='lg' radius='lg' withBorder>
                <Title order={2}>
                  {anime.title}
                  <Title order={3}>Rank {anime.rank} </Title>
                </Title>
                <Image width='320' height='auto' mx='auto' radius='md' alt={anime.title} src={anime["images"]["jpg"].image_url}></Image>
                <Text>
                  {anime.synopsis}
                </Text>
              </Card>
            </li>
          ))}
        </ul>
      </MantineProvider>
    </>
  );
}
//add quotes of each anime
export default App;
