import "./App.css";
import { useEffect, useState } from "react";
import { MantineProvider, Title, Card, Image, Text, Spoiler, Grid, Center, Loader } from "@mantine/core";
function App() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() =>{
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?limit=10")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <>
    {loading?(<><Center h={500}><Image src="https://gifdb.com/images/high/cute-levi-motion-chibi-artwork-eodsifvum00tzf3x.gif" style={{width: 200, height: 150}}></Image></Center><Text>Somebody has to clean</Text><Loader variant="dots" color="white"></Loader></>):(
      <MantineProvider theme={{colorScheme: 'dark'}}>
        <Title order={1}>Top Anime</Title>
        <br></br>
        <Grid>
        
          {data["data"]?.map((anime) => (
            
            <Grid.Col lg={6} xs={3}>
              <Card style={{width: 'fit-content', margin: 'auto'}} shadow='sm' padding='sm' radius='lg' withBorder>
                <Title order={2}>{anime.title}</Title>
                  <Title order={3}>Rank {anime.rank} </Title>
                  <Title order={4}>⭐{anime.score}</Title>
                  <Title order={5}>{anime.genres[0].name}</Title>
                
                <a target='_blank' href={anime.url}><Image width='320' height='auto' mx='auto' radius='md' alt={anime.title} src={anime["images"]["jpg"].image_url}></Image></a>
                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                <Text>
                  {anime.synopsis}
                </Text>
              </Spoiler>
              </Card>
              </Grid.Col>
              
          ))}
         
        </Grid>
      </MantineProvider>
    )}
    </>
  );
}
//add quotes of each anime
//custom list for user
export default App;
