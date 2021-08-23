import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { searchContributionPost } from '../../services/contribute-api'
import SearchPost from './SearchResult/SearchResult'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  heading: {
    fontSize: '28px',
    margin: '14px 0',
    '@media (max-width: 600px)': {
      fontSize: '22px',
    },
  },
  button: {
    width: '100%',
    padding: '10px 12px',
    color: 'white',
    backgroundColor: '#6045E2',
    fontWeight: '700',
    borderRadius: '4px',
    border: 'none',
    margin: '16px 5px',
    
  },
});

const SearchForHelp = ({ searchQuery }) => {
  const [searchData, setSearchData] = useState([])
  const history = useHistory();

  const fetchContributionPost = async (formData) => {
    try {
      const res = await searchContributionPost(formData)
      if (res.status === 200) {
        setSearchData(res.data.ResponseData)
        console.log(res.data.ResponseData)
      }
    } catch (error) {
      setSearchData([])
      console.log(error)
    }
  }

  const handleCancel = () => {
    history.push('/');
  };

  useEffect(() => {
    const {
      bloodPlasma,
      oxygen,
      ambulance,
      medicine,
      beds,
      icuBeds,
      food,
      others,
      pincode
    } = searchQuery;
    const formData = new FormData();
    formData.append('pincode', +pincode);
    oxygen && formData.append('oxygen', oxygen);
    ambulance && formData.append('ambulance', ambulance);
    medicine && formData.append('medicine', medicine);
    beds && formData.append('beds', beds);
    icuBeds && formData.append('icuBeds', icuBeds);
    food && formData.append('food', food);
    others && formData.append('others', others);
    bloodPlasma && formData.append('bloodPlasma', bloodPlasma);
    fetchContributionPost(formData)
    return () => { };
  }, [searchQuery]);

  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} md={11} style={{ minHeight: '100vh' }}>
        <Grid container justify="center" alignItems="center" >
          <Grid item xs={12}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={8} md={10}>
                <h3 className={classes.heading}>Results of Your search</h3>
              </Grid>
              <Grid item xs={4} md={2}>
                <button className={classes.button} onClick={handleCancel}>
                  Go Back
                </button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SearchPost searchData={searchData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchForHelp;
