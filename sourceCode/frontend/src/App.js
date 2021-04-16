import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PlanNewWorkout from './pages/NewWorkout/PlanNewWorkout';
import ProtectedRoutes from './protectedRoute';
import allNewWorkouts from './pages/NewWorkout/allNewWorkouts';
import workoutDetails from './pages/NewWorkout/workoutDetails';
import LogWorkout from './pages/OldWorkout/logWorkout';
import allOldWorkouts from './pages/OldWorkout/allOldWorkouts';
import oldWorkoutDetails from './pages/OldWorkout/oldWorkoutDetails';
import Goal from './pages/GoalandRecommendation/Goal';
import viewGoalandRecommendation from './pages/GoalandRecommendation/viewGoalandRecommendation';
import Settings from './pages/Settings/Settings';
import LogSleep from './pages/SleepandMentalHealth/LogSleep';
import ViewSleep from './pages/SleepandMentalHealth/ViewSleep';
import SleepDetails from './pages/SleepandMentalHealth/SleepDetails';
import UseRecommendation from './pages/GoalandRecommendation/useRecommendation';

//const cookies = new Cookies();
//cookies.remove('TOKEN', { path: '/' });


function App() {

  return (
    <>
        <Router >
            <Switch> 
                <Route exact path='/' component={LandingPage} /> 
                <Route exact path='/signup' component={SignUpPage} /> 
                <Route exact path='/login' component={LogInPage} />
                <ProtectedRoutes exact path='/home' component={Dashboard}/>
                <ProtectedRoutes exact path='/settings' component={Settings}/> 
                <ProtectedRoutes exact path='/planworkout' component={PlanNewWorkout} />
                <ProtectedRoutes exact path='/allnewworkouts' component={allNewWorkouts} />
                <ProtectedRoutes exact path="/newworkout/id=:id" component={workoutDetails} />
                <ProtectedRoutes exact path="/logworkout" component={LogWorkout} />
                <ProtectedRoutes exact path="/alloldworkouts" component={allOldWorkouts} />
                <ProtectedRoutes exact path="/oldworkout/id=:id" component={oldWorkoutDetails} />
                <ProtectedRoutes exact path="/creategoal" component={Goal} />
                <ProtectedRoutes exact path="/goalsandrecommendations" component={viewGoalandRecommendation} />
                <ProtectedRoutes exact path="/logsleep" component={LogSleep} />
                <ProtectedRoutes exact path="/viewsleep" component={ViewSleep} />
                <ProtectedRoutes exact path="/sleep/id=:id" component={SleepDetails} />
                <ProtectedRoutes exact path="/userecommendation/id=:id" component={UseRecommendation} />
            </Switch>
        </Router>
      </>
  );
}

export default App;
