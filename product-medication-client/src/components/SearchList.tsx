import {Typography,Card,CardContent,Grid } from '@mui/material';
import styles from './SearchList.module.css'
import { useStylesUtility } from '../helper/useStylesUtility';

export const SearchList = (props:any)=>{
    const {searchData} = props
    const classes = useStylesUtility();

    return (
        <div>
            {
                (searchData.length>0)?
                (
                    <div>
                        <Typography variant="body1" className={styles.searchPadding}>Showing {searchData.length} results</Typography>
                        <Grid container spacing={2} className={`${styles.height} ${classes.scroll}`}>
                        {
                            searchData.map((data:any)=>{
                                return (
                                    <Grid item xs={12} key={data._id}>
                                    <Card sx={{ background: 'aliceblue'}}>
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.name}
                                        </Typography>
                                        <ul className={styles.ulColor}>
                                            {
                                                data.diseases.map((disease:any)=>{
                                                    return <li>{disease}</li>
                                                })
                                            }
                                        </ul>
                                        <Typography paragraph className={styles.paraBorder}>
                                            {data.description}
                                        </Typography>
                                        </CardContent>
                                    </Card>
                                    </Grid>
                                )
                            })
                        }
                        </Grid>
                    </div>
                ):
                (<Typography color='error'>
                    There is no search results, please type correct drug or disease name.
                </Typography>)
            }
        </div>
    )
}