import React, { useState,useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import DetailsCard from '../../../components/DetailsCard/DetailsCard'
import DetailsCardDialog from '../../../components/DetailsCardDialog/DetailsCardDialog';
const NeedHelpPost = ({ getHelpPosts ,limit=false}) => {
    
    const [openDialog, setOpenDialog] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [requiredData, setRequiredData] = useState([])

    useEffect(() => {
        if(limit){
            setRequiredData(getHelpPosts.slice(0,limit) || [])
        }else{
            setRequiredData(getHelpPosts || [])
        }
        return () => {
            
        }
    }, [getHelpPosts, limit])
    

    const handleClose = () => {
        setOpenDialog(false)
    }
    const handleOpen = () => {
        setOpenDialog(true)
    }
    const handleClickCard = (post) => {
        console.log(post)
        setCurrentData(post)
        handleOpen()
    }

    return (
        <Grid container justify='center' alignItems='center' >
            {
                requiredData.map((post)=><DetailsCard handleClickCard={handleClickCard} data={post} key={post._id} />)
            }
            <DetailsCardDialog open={openDialog} handleClose={handleClose} data={currentData}/>
        </Grid>
    )
}

export default NeedHelpPost
