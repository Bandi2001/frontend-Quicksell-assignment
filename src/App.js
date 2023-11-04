import React, { useEffect } from 'react'
import './App.css';
import TopButton from './components/TopButton/TopButton';
// import Card from './components/Card/Card';
import DashView from './components/DashBoard/DashView';
import { useDispatch, useSelector} from 'react-redux'
import { fetchAllData } from './Actions/Action';
import Loading from './components/Refresh/Refresh';

const App = () => {
  const dispatch = useDispatch();
  const {allTickets} = useSelector(state => state.DataReducer);
   
  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch])

  return allTickets ? (
    <div style={{paddingTop : "10px"}} >
      <TopButton/>
      <hr style={{marginTop : "10px"}} />
      <DashView/>
    </div>
  ) : <Loading/>
}

export default App