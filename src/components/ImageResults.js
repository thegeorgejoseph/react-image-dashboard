import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info'; 
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));

const ImageResults = (props) => {
    const classes = useStyles();
    let imageListContent;
    const images = props.images
    const [dialogueState,setDialogueState] = useState({open : false, currentImg : ''});

    if (images){
        imageListContent = (
            <GridList className={classes.gridList} cols={3}>
                {
                    images.map((img)=> (
                        <GridListTile key={img.id} className={classes.gridList}>
                            <img src={img.largeImageURL} alt="" />
                            <GridListTileBar
                                title={img.tags}
                                key={img.id}
                                subtitle={<span>by: {img.user}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon} onClick={() => (handleOpen(img.largeImageURL))}>
                                        <ZoomInIcon color="secondary"/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))
                }
            </GridList>
        )
    } else {
        imageListContent = null
    }        
    const handleOpen = (img) => {
        setDialogueState(prevState => ({...prevState,open:true,currentImg:img}))
    } 
    const handleClose = () => {
        setDialogueState(prevState => ({...prevState,open:false}))
    }
    const actions = [< Button label="Close" primary={true} onClick={handleClose}/>]
    return (
        <div className={classes.root}>
            {imageListContent}
            <Dialog actions={actions} open={dialogueState.open} onClose={handleClose} >    
            <img src={dialogueState.currentImg} alt="" style = {{width: "100%"}}/>
            </Dialog>
        </div>

    )
    


}

ImageResults.propTypes ={
    images : PropTypes.array.isRequired
}
export default ImageResults
