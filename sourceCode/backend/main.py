from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import datetime

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

#   users = [
#               {
#                    username1':
#                   'email1':
#                   'date_of_birth1':
#                   'height1':
#                   'weight1': 
#                   'password1': 
#               },
#               {
#                    username2':
#                   'email2':
#                   'date_of_birth2':
#                   'height2':
#                   'weight2': 
#                   'password2': 
#               }
#           ]
users = []


#   users_new_workouts = {
#                   'user_email1': [
#                                       {
#                                           'id'
#                                           'completion_date':
#                                           'workout_type':
#                                           'mapjson':
#                                           'distance':
#                                           'calories_burnt':
#                                           'time_taken':
#                                       },
#
#                                       {
#                                           'id'
#                                           'completion_date':
#                                           'workout_type':
#                                           'mapjson':
#                                           'distance':
#                                           'calories_burnt':
#                                           'time_taken':
#                                        }
#                                   ],
#                   'user_email2': [
#                                   ......
#                                  ]
#                   }
users_new_workouts = {}



#   users_old_workouts = {
#                   'user_email1': [
#                               {
#                                   'id'
#                                   'date':
#                                   'workout_type':
#                                   'mapjson':
#                                   'distance':
#                                   'calories_burnt':
#                                   'time_spent':
#                                   'pace':
#                               },
#
#                               {
#                                   'id'
#                                   'date':
#                                   'workout_type':
#                                   'mapjson':
#                                   'distance':
#                                   'calories_burnt':
#                                   'time_spent':
#                                   'pace':
#                               }
#                           ],
#                   'user_email2': [
#                                   ......
#                                  ]
#               }
users_old_workouts = {}



#   users_goals = {
#               'user_email1' : [
#                                   {
#                                       'id'
#                                       'completion_date'
#                                       'workout_type'
#                                       'total_distance'
#                                       'total_calories'
#                                       'total_time'
#                                       'status'
#                                   }
#                               ]
#                }                              
users_goals = {}

#   users_recommendations = {
#               'user_email1' : [
#                                   {
#                                       'id'
#                                       'workout_type'
#                                       'distance'
#                                       'time'
#                                   }
#                               ]
# 
users_recommendations = {}

# structure of users_total_stats
# users_total_stats = {
#                   'user1_email': {
#                       'total_time':         
#                       'total_calories':
#                       'total_distance':
#                   }
#               }
users_total_stats = {}

# users_personal_stats = {
#                   'user1_email': {  
#                       'height': 
#                       'weight':
#                   }
#               }
users_personal_stats = {}


#   users_sleep = {
#           'user1_email': [
#               0: {
#                   date:
#                   time:
#                   feeling:
#               }
#           ]
#   }
users_sleep = {}

loggedin_user = None

class loggedIn(Resource):

    def get(self):
        #print(loggedin_user)
        if(loggedin_user):
            return {'loggedin': True}
        else:
            return {'loggedin': False}

class validateSignUp(Resource):

    def post(self):
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        args = parser.parse_args()

        #username_error = any(args['username'] in user.values() for user in users.values())
        #email_error = any(args['email'] in user.values() for user in users.values())
        error = False
        for user in users:
            print(user)
            if (user['username'] == args['username'] or user['email'] == args['email']):
                error = True

        #print("Username exists alr? ", username_error)
        #print("Email exists alr?", email_error)

        if(error):
            return {'valid': False}
        else:
            return {'valid': True}


class signUp(Resource):
    def post(self):
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('date_of_birth')
        parser.add_argument('height', type=int)
        parser.add_argument('weight', type=int)
        parser.add_argument('password', type=str)

        args = parser.parse_args()

        username = args['username']
        email = args['email']
        date_of_birth = args['date_of_birth']
        height = args['height']
        weight = args['weight']
        password = args['password']

        print('Username: ', username)
        print('Email: ', email)
        print('Date of Birth: ', date_of_birth)
        print('Height: ', height)
        print('Weight: ', weight)
        print('password', password)

        # Check date of birth

        size = len(users)
        users.append({
            'username': username,
            'email': email,
            'date_of_birth': date_of_birth,
            'height': height,
            'weight': weight,
            'password': password
        })

        users_new_workouts[email] = []
        users_old_workouts[email] = []
        users_goals[email] = []
        users_recommendations[email] = []
        users_goals[email] = []
        users_total_stats[email] = {}
        users_personal_stats[email] = {}
        users_sleep[email] = []

        users_personal_stats[email]['height'] = height
        users_personal_stats[email]['weight'] = weight

        users_total_stats[email]['total_distance'] = 10
        users_total_stats[email]['total_calories'] = 0
        users_total_stats[email]['total_time'] = 0

        re1 = {}
        re1['id'] = 0
        re1['workout_type'] = 'Running'
        re1['distance'] = 10
        re1['time'] = 10

        users_recommendations[email].append(re1)
        re = {}
        re['id'] = 1
        re['workout_type'] = 'Cycling'
        re['distance'] = 20
        re['time'] = 20

        users_recommendations[email].append(re)

        return {'saved': True}

class logIn(Resource):

    def post(self):
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        email = args['email']
        password = args['password']

        #print(type(email))
        #print(type(password))
        #print(email)
        #print(password)

        #print(users)
        if(not users):
            return {'login': False}
        
        loggedin = False
        for user in users:
            #print(user)
            #print(type(user['email']))
            #print(type(user['password']))
            #print(user['email'])
            #print(user['password'])
            if(user['email'] == email and user['password'] == password):
                loggedin = True
                global loggedin_user 
                loggedin_user = {'email': email}
                return {'login': True}

        if(not loggedin):
            return {'login': False}


class planNewWorkout(Resource):

    def post(self):

        email = loggedin_user['email']
        parser.add_argument('completion_date')
        parser.add_argument('workout_type', type=str)
        parser.add_argument('mapjson')
        parser.add_argument('distance')
        parser.add_argument('calories_burnt')
        parser.add_argument('time_taken')

        args = parser.parse_args()
    
        completion_date = args['completion_date']
        completion_date = completion_date[:10]
        date = datetime.datetime.strptime(completion_date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")
        workout_type = args['workout_type']
        mapjson = args['mapjson']
        distance = args['distance']
        calories_burnt = args['calories_burnt']
        time_taken = args['time_taken']

        workout = {}
        workout['id'] = len(users_new_workouts[email])
        workout['completion_date'] = true_date
        workout['workout_type'] = workout_type
        workout['mapjson'] = mapjson
        workout['distance'] = distance
        workout['calories_burnt'] = calories_burnt
        workout['time_taken'] = time_taken

        users_new_workouts[email].append(workout)
        #print(users_new_workouts[email])
        
        #if(completion_date and workout_type and distance != "0" and calories_burnt != "0" and time_taken != "0")
        return {'saved': True}

class getNewWorkouts(Resource):

    def get(self):
        email = loggedin_user['email']
        workouts = []
        for w in users_new_workouts[email]:
            y1, m1, d1 = w['completion_date'].split('-')
            w_date = datetime.date(int(y1), int(m1), int(d1))
            today = datetime.date.today()
            
            if(w_date >= today):
                workouts.append(w)

        return {'list': workouts}

class getWorkoutDetails(Resource):

    def get(self, workout_id):
        email = loggedin_user['email']
        workouts_array = users_new_workouts[email]
        workout_json = {}
        #print(workout_id)
        print(workouts_array)
        for workout in workouts_array:
            
            if(workout['id'] == int(workout_id)):
                #print('hahahahah')
                workout_json = workout
                break

        #print(workout_json)

        return {'workout': workout_json}

class updateNewWorkout(Resource):

    def post(self):
        email = loggedin_user['email']
        parser.add_argument('id')
        parser.add_argument('completion_date')
        parser.add_argument('workout_type', type=str)
        parser.add_argument('mapjson')
        parser.add_argument('distance')
        parser.add_argument('calories_burnt')
        parser.add_argument('time_taken')

        args = parser.parse_args()

        workout_id = args['id']
        completion_date = args['completion_date']
        completion_date = completion_date[:10]

        date = datetime.datetime.strptime(completion_date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")
        print(true_date)
        workout_type = args['workout_type']
        mapjson = args['mapjson']
        distance = args['distance']
        calories_burnt = args['calories_burnt']
        time_taken = args['time_taken']

        print('**********')
        print('Passed in ',workout_id)

        updated_workout = {}
        updated_workout['id'] = int(workout_id)
        updated_workout['completion_date'] = true_date
        updated_workout['workout_type'] = workout_type
        updated_workout['mapjson'] = mapjson
        updated_workout['distance'] = distance
        updated_workout['calories_burnt'] = calories_burnt
        updated_workout['time_taken'] = time_taken
        for workout in users_new_workouts[email]:
            if(workout['id'] == int(workout_id)):
                print('Stored ', workout['id'])
                print('New ', updated_workout['id'])
                print('**********')
                users_new_workouts[email].remove(workout)
                users_new_workouts[email].append(updated_workout)
                break
        
        #if(completion_date and workout_type and distance != "0" and calories_burnt != "0" and time_taken != "0")
        return {'updated': True}

class deleteWorkout(Resource):

    def post(self):
        email = loggedin_user['email']
        parser.add_argument('id')

        args = parser.parse_args()

        workout_id = args['id']

        for workout in users_new_workouts[email]:
            if(workout['id'] == int(workout_id)):
                users_new_workouts[email].remove(workout)
                break

        return {'deleted': True}

class logWorkout(Resource):

    def post(self):
        email = loggedin_user['email']
        parser.add_argument('id')
        parser.add_argument('date')
        parser.add_argument('workout_type')
        parser.add_argument('mapjson')
        parser.add_argument('distance')
        parser.add_argument('calories_burnt')
        parser.add_argument('time_spent')
        parser.add_argument('pace')

        args = parser.parse_args()

        date = args['date']
        date = date[:10]
        date = datetime.datetime.strptime(date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")
        workout_type = args['workout_type']
        mapjson = args['mapjson']
        distance = args['distance']
        calories_burnt = args['calories_burnt']
        time_spent = args['time_spent']
        pace = args['pace']

        workout = {}
        workout['id'] = len(users_old_workouts[email])
        workout['date'] = true_date
        workout['workout_type'] = workout_type
        workout['mapjson'] = mapjson
        workout['distance'] = distance
        workout['calories_burnt'] = calories_burnt
        workout['time_spent'] = time_spent
        workout['pace'] = pace

        users_old_workouts[email].append(workout)

        users_total_stats[email]['total_distance'] = users_total_stats[email]['total_distance'] + float(distance)
        users_total_stats[email]['total_calories'] = users_total_stats[email]['total_calories'] + float(calories_burnt)
        users_total_stats[email]['total_time'] = users_total_stats[email]['total_time'] + float(time_spent)

        return {'saved': True}

class getOldWorkouts(Resource):

    def get(self):
        email = loggedin_user['email']
        return {'list': users_old_workouts[email]}

class getOldWorkoutDetails(Resource):

    def get(self, workout_id):
        email = loggedin_user['email']
        workouts_array = users_old_workouts[email]
        workout_json = {}
        
        print(workouts_array)
        for workout in workouts_array:
            if(workout['id'] == int(workout_id)):
                workout_json = workout
                break

        return {'workout': workout_json}


class reUserWorkout(Resource):

    def post(self):
        email = loggedin_user['email']
        parser.add_argument('id')

        args = parser.parse_args()

        workout_id = args['id']

        old_workouts = users_old_workouts[email]
        new_workouts = users_new_workouts[email]

        for workout in old_workouts:
            if(workout['id'] == int(workout_id)):
                old_workouts.remove(workout)
                today = datetime.date.today()
                today = today.strftime("%Y-%m-%d")
                print(today)
                workout['completion_date'] = today
                workout['time_taken'] = workout['time_spent']
                workout['date'] = today
                new_workouts.append(workout)
                break
        
        return {'reuse': True}


class createNewGoal(Resource):

    def post(self):

        email = loggedin_user['email']
        parser.add_argument('completion_date')
        parser.add_argument('workout_type')
        parser.add_argument('total_distance')
        parser.add_argument('total_calories')
        parser.add_argument('total_time')

        args = parser.parse_args()

        completion_date = args['completion_date']
        workout_type = args['workout_type']
        total_distance = args['total_distance']
        total_calories = args['total_calories']
        total_time = args['total_time']

        completion_date = completion_date[:10]
        date = datetime.datetime.strptime(completion_date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")

        goal = {}
        goal['id'] = len(users_goals[email])
        goal['completion_date'] = true_date
        goal['workout_type'] = workout_type
        goal['total_distance'] = float(total_distance)
        goal['total_calories'] = float(total_calories)
        goal['total_time'] = float(total_time)
        goal['status'] = 'inProgess'

        users_goals[email].append(goal)

        return {'saved': True}        


class getGoalRecommendation(Resource):

    def get(self):

        email = loggedin_user['email']
        for goal in users_goals[email]:
            # Check date
            y1, m1, d1 = goal['completion_date'].split('-')
            #print(int(y1), int(m1), int(d1))
            goal_date = datetime.date(int(y1), int(m1), int(d1))
            print(goal_date)
            today = datetime.date.today()
            
            if(goal_date >= today):
                # Check if goal is completed
                if(users_total_stats[email]['total_distance'] >= goal['total_distance'] and users_total_stats[email]['total_calories'] >= goal['total_calories'] and users_total_stats[email]['total_time'] >= goal['total_time']):
                    # The goal has been completed - 'status' = 'completed'
                    goal['status'] = 'completed'
                else:
                    goal['status'] = 'inProgess'
            else:
                # Check if goal is completed
                if(users_total_stats[email]['total_distance'] >= goal['total_distance'] and users_total_stats[email]['total_calories'] >= goal['total_calories'] and users_total_stats[email]['total_time'] >= goal['total_time']):
                    # The goal has been completed - 'status' = 'completed'
                    goal['status'] = 'completed'
                else:
                    goal['status'] = 'uncompleted'


        return {'goals': users_goals[email],
                'recommendations': users_recommendations[email]
                }
        
class deleteGoal(Resource):

    def post(self):
        email = loggedin_user['email']

        parser.add_argument('id')

        args = parser.parse_args()

        goal_id = args['id']

        for goal in users_goals[email]:
            if(goal['id'] == int(goal_id)):
                users_goals[email].remove(goal)
                break

        return {'deleted': True}

class useRecommendation(Resource):

    def post(self):

        email = loggedin_user['email']

        parser.add_argument('id')
        parser.add_argument('completion_date')
        parser.add_argument('workout_type', type=str)
        parser.add_argument('mapjson')
        parser.add_argument('distance')
        parser.add_argument('calories_burnt')
        parser.add_argument('time_taken')

        args = parser.parse_args()

        recommendation_id = args['id']
        completion_date = args['completion_date']
        completion_date = completion_date[:10]
        date = datetime.datetime.strptime(completion_date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")
        workout_type = args['workout_type']
        mapjson = args['mapjson']
        distance = args['distance']
        calories_burnt = args['calories_burnt']
        time_taken = args['time_taken']

        workout = {}
        workout['id'] = len(users_new_workouts[email])
        workout['completion_date'] = true_date
        workout['workout_type'] = workout_type
        workout['mapjson'] = mapjson
        workout['distance'] = distance
        workout['calories_burnt'] = calories_burnt
        workout['time_taken'] = time_taken

        users_new_workouts[email].append(workout)

        for recommendation in users_recommendations[email]:
            if(recommendation['id'] == int(recommendation_id)):
                users_recommendations[email].remove(recommendation)
                break
        
        return {'saved': True}
            
class updateEmailPassword(Resource):

    def post(self):
        
        parser.add_argument('old_email')
        parser.add_argument('new_email')
        parser.add_argument('new_password')

        args = parser.parse_args()

        old_email = args['old_email']
        new_email = args['new_email']
        new_password = args['new_password']

        # Update user credentials in 'users'
        for user in users:
            if(user['email'] == old_email):
                if(new_email == ''):
                    user['password'] = new_password
                else:
                    user['email'] = new_email
                    # Update all email related informations
                    # users_new_workouts
                    new_workouts = users_new_workouts[old_email]
                    users_new_workouts[new_email] = new_workouts
                    # Remove old email from users_new_workouts
                    del users_new_workouts[old_email]


                    # users_old_workouts
                    old_workouts = users_old_workouts[old_email]
                    users_old_workouts[new_email] = old_workouts
                    del users_old_workouts[old_email]

                    # users_goals
                    goals = users_goals[old_email]
                    users_goals[new_email] = goals
                    del users_goals[old_email]


                    # users_recommendations
                    recommendations = users_recommendations[old_email]
                    users_recommendations[new_email] = recommendations
                    del users_recommendations[old_email]


                    # users_total_stats
                    total_stats = users_total_stats[old_email]
                    users_total_stats[new_email] = total_stats
                    del users_total_stats[old_email]


                    # users_personal_stats
                    personal_stats = users_personal_stats[old_email]
                    users_personal_stats[new_email] = personal_stats
                    del users_personal_stats[old_email]

        return {'updated': True}


class updateHeightWeight(Resource):

    def post(self):
        email = loggedin_user['email']
        parser.add_argument('new_height')
        parser.add_argument('new_weight')

        args = parser.parse_args()

        new_height = args['new_height']
        new_weight = args['new_weight']

        users_personal_stats[email]['height'] = new_height
        users_personal_stats[email]['weight'] = new_weight

        return {'updated': True}

class getUserInfo(Resource):

    def get(self):
        email = loggedin_user['email']

        height = users_personal_stats[email]['height']
        weight = users_personal_stats[email]['weight']

        return {
            'old_email': email,
            'old_height': height,
            'old_weight': weight
        }

class logSleep(Resource):

    def post(self):

        email = loggedin_user['email']
        parser.add_argument('date')
        parser.add_argument('time')
        parser.add_argument('feeling')

        args = parser.parse_args()

        date = args['date']
        date = date[:10]
        date = datetime.datetime.strptime(date, "%Y-%m-%d")
        true_date = date + datetime.timedelta(days=1)
        true_date = true_date.strftime("%Y-%m-%d")

        time = args['time']
        feeling = args['feeling']

        sleep = {}
        sleep['id'] = len(users_sleep[email])
        sleep['date'] = true_date
        sleep['time'] = time
        sleep['feeling'] = feeling

        users_sleep[email].append(sleep)

        return {'saved': True}

class getSleep(Resource):

    def get(self):

        email = loggedin_user['email']

        return {'list': users_sleep[email]}


class getRecommendation(Resource):

    def get(self, recommendation_id):

        email = loggedin_user['email']
        recommendation_json = {}

        for recommendation in users_recommendations[email]:
            if(recommendation['id'] == int(recommendation_id)):
                recommendation_json = recommendation
                break

        return {'recommendation': recommendation_json}
        

class completeWorkout(Resource):

    def post(self, workout_id):

        email = loggedin_user['email']

        workout = {}
        w = {}
        for new_workout in users_new_workouts[email]:
            if(new_workout['id'] == int(workout_id)):
                workout = new_workout
                users_new_workouts[email].remove(new_workout)

        today = datetime.date.today()
        today = today.strftime("%Y-%m-%d")
        w['id'] = len(users_old_workouts[email])
        w['date'] = today
        w['workout_type'] = workout['workout_type']
        w['mapjson'] = workout['mapjson']
        w['distance'] = workout['distance']
        w['calories_burnt'] = workout['calories_burnt']
        w['time_spent'] = workout['time_taken']
        w['pace'] = float(workout['distance']) / float(workout['time_taken']) if float(workout['time_taken']) != 0.0 else 0

    
        users_old_workouts[email].append(w)

        return {'completed': True}
        # completion_date -> date
        # time_taken -> time_spent
        # pace = distance / time_taken

                




api.add_resource(validateSignUp, '/checkUsernameAndEmail')
api.add_resource(signUp, '/saveSignUpData')
api.add_resource(logIn, '/checkLogIn')
api.add_resource(loggedIn, '/loggedIn')
api.add_resource(planNewWorkout, '/saveNewWorkout')
api.add_resource(getNewWorkouts, '/getNewWorkouts')
api.add_resource(getWorkoutDetails, '/getWorkoutDetails/id=<workout_id>')
api.add_resource(updateNewWorkout, '/updateNewWorkout')
api.add_resource(deleteWorkout, '/deleteworkout')
api.add_resource(completeWorkout, '/completeWorkout/id=<workout_id>')
api.add_resource(logWorkout, '/logWorkout')
api.add_resource(getOldWorkouts, '/getOldWorkouts')
api.add_resource(getOldWorkoutDetails, '/getOldWorkoutDetails/id=<workout_id>')
api.add_resource(reUserWorkout, '/reUseOldWorkout')
api.add_resource(createNewGoal, '/createNewGoal')
api.add_resource(getGoalRecommendation, '/getGoalRecommendation')
api.add_resource(getRecommendation, '/getRecommendation/id=<recommendation_id>')
api.add_resource(deleteGoal, '/deleteGoal')
api.add_resource(useRecommendation, '/useRecommendation')
api.add_resource(updateEmailPassword, '/updateEmailPassword')
api.add_resource(updateHeightWeight, '/updateHeightWeight')
api.add_resource(getUserInfo, '/getUserInfo')
api.add_resource(logSleep, '/logSleep')
api.add_resource(getSleep, '/getSleep')

if __name__ == '__main__':
    app.run(debug=True)