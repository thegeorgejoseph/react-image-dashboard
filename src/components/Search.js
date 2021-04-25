import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import ImageResults from './ImageResults';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textfield : {
        width: '100%',
    },
  }));
const Search = () => {
    const classes = useStyles();
    const initialState = {
        searchText : '',
        amount : '',
        url : 'https://pixabay.com/api',
        key : process.env.REACT_APP_API_KEY,
        images : [],
    }
    const [state,setState] = useState(initialState);
    const onTextChange = (e) => {
    
        setState(prevState => ({...prevState,searchText:e.target.value}))
        axios.get(`${state.url}/?key=${state.key}&q=${state.searchText}&image_type=photo&per_page=${state.amount}&safesearch=true`)
        .then(res => setState((prevState) => ({...prevState,images:res.data.hits})))
        .catch(err => console.log(err))

    }
    const onAmountChange = (e) => {
    
        setState(prevState => ({...prevState,amount:e.target.value}))

    }
    
    return (
        <div>
            {console.log(state.images)}
            <TextField className={classes.textfield} id="standard-basic" label="Search For Images" value={state.searchText} onChange={onTextChange}  />
            <Select
                labelId="selectfield"
                id="demo-simple-select"
                value={state.amount}
                onChange={onAmountChange}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={50}>50</MenuItem>
            </Select>

            {state.images.length > 0 ? <ImageResults /> : <h1 style={{height:'px',width:'20%',margin:'auto'}}>Images Not Found</h1>}
        </div>
    )
}

export default Search
