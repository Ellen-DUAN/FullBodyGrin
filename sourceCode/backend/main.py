from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import datetime
import json
import os

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()

# Load users
if not os.path.isfile('database/users.json'):
    open('database/users.json', 'x')
    users = []
elif os.stat('database/users.json').st_size == 0:
    users = []
else:
    with open('database/users.json') as read_file:
        users = json.load(read_file)

# Load users_new_workouts   
if not os.path.isfile('database/users_new_workouts.json'):
    open('database/users_new_workouts.json', 'x')
    users_new_workouts = {}
elif os.stat('database/users_new_workouts.json').st_size == 0:
    users_new_workouts = {}
else:
    with open('database/users_new_workouts.json') as read_file:
        users_new_workouts = json.load(read_file)

# Load users_old_workouts
if not os.path.isfile('database/users_old_workouts.json'):
    open('database/users_old_workouts.json', 'x')
    users_old_workouts = {}  
elif os.stat('database/users_old_workouts.json').st_size == 0:
    users_old_workouts = {}
else:
    with open('database/users_old_workouts.json') as read_file:
        users_old_workouts = json.load(read_file)

# Load users_goals                           
if not os.path.isfile('database/users_goals.json'):
    open('database/users_goals.json', 'x')
    users_goals = {}  
elif os.stat('database/users_goals.json').st_size == 0:
    users_goals = {}
else:
    with open('database/users_goals.json') as read_file:
        users_goals = json.load(read_file)

# Load users_recommendations
if not os.path.isfile('database/users_recommendations.json'):
    open('database/users_recommendations.json', 'x')
    users_recommendations = {}  
elif os.stat('database/users_recommendations.json').st_size == 0:
    users_recommendations = {}
else:
    with open('database/users_recommendations.json') as read_file:
        users_recommendations = json.load(read_file)

# Load users_total_stats
if not os.path.isfile('database/users_total_stats.json'):
    open('database/users_total_stats.json', 'x')
    users_total_stats = {}  
elif os.stat('database/users_total_stats.json').st_size == 0:
    users_total_stats = {}
else:
    with open('database/users_total_stats.json') as read_file:
        users_total_stats = json.load(read_file)

# Load users_personal_stats
if not os.path.isfile('database/users_personal_stats.json'):
    open('database/users_personal_stats.json', 'x')
    users_personal_stats = {}  
elif os.stat('database/users_personal_stats.json').st_size == 0:
    users_personal_stats = {}
else:
    with open('database/users_personal_stats.json') as read_file:
        users_personal_stats = json.load(read_file)

# Load users_sleep
if not os.path.isfile('database/users_sleep.json'):
    open('database/users_sleep.json', 'x')
    users_sleep = {}  
elif os.stat('database/users_sleep.json').st_size == 0:
    users_sleep = {}
else:
    with open('database/users_sleep.json') as read_file:
        users_sleep = json.load(read_file)

loggedin_user = None

# loggIn class
class loggedIn(Resource):
    def get(self):
        if(loggedin_user):
            return {'loggedin': True}
        else:
            return {'loggedin': False}

# validateSignUp class
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

# signUp class
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
        with open('database/users.json', 'w') as write_file:
            json.dump(users, write_file)

        users_new_workouts[email] = []
        with open('database/users_new_workouts.json', 'w') as write_file:
            json.dump(users_new_workouts, write_file)
            
        users_old_workouts[email] = []
        with open('database/users_old_workouts.json', 'w') as write_file:
            json.dump(users_old_workouts, write_file)
        
        users_goals[email] = []
        with open('database/users_goals.json', 'w') as write_file:
            json.dump(users_goals, write_file)         
        
        users_total_stats[email] = {}
        users_total_stats[email]['total_distance'] = 10
        users_total_stats[email]['total_calories'] = 0
        users_total_stats[email]['total_time'] = 0
        with open('database/users_total_stats.json', 'w') as write_file:
            json.dump(users_total_stats, write_file)
        
        users_personal_stats[email] = {}
        users_personal_stats[email]['height'] = height
        users_personal_stats[email]['weight'] = weight
        with open('database/users_personal_stats.json', 'w') as write_file:
            json.dump(users_personal_stats, write_file)                

        users_recommendations[email] = []
        re = {}
        re['id'] = 0
        re['workout_type'] = 'Running'
        re['distance'] = 10
        re['time'] = 10
        users_recommendations[email].append(re)
        re1 = {}
        re1['id'] = 1
        re1['workout_type'] = 'Cycling'
        re1['distance'] = 20
        re1['time'] = 20
        users_recommendations[email].append(re1)
        with open('database/users_recommendations.json', 'w') as write_file:
            json.dump(users_recommendations, write_file)
            
        users_sleep[email] = []
        with open('database/users_sleep.json', 'w') as write_file:
            json.dump(users_sleep, write_file)

        return {'saved': True}

# logIn class
class logIn(Resource):
    def post(self):
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()

        email = args['email']
        password = args['password']

        if(not users):
            return {'login': False}
        
        loggedin = False
        for user in users:
            if(user['email'] == email and user['password'] == password):
                loggedin = True
                global loggedin_user 
                loggedin_user = {'email': email, 'weight': user['weight'] }
                return {'login': True}

        if(not loggedin):
            return {'login': False}

# planNewWorkout class
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
        currentUserWeight = loggedin_user['weight']
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
        if (workout_type == 'Cycling'):
            METS = 10
        else:
            METS = 8
        time_taken_hours = (int(time_taken) / 60)
        workout = {}
        workout['id'] = len(users_new_workouts[email])
        workout['completion_date'] = true_date
        workout['workout_type'] = workout_type
        workout['mapjson'] = mapjson
        workout['distance'] = distance
        workout['calories_burnt'] = (METS*currentUserWeight)*time_taken_hours
        workout['time_taken'] = time_taken

        users_new_workouts[email].append(workout)
        with open('database/users_new_workouts.json', 'w') as write_file:
            json.dump(users_new_workouts, write_file)
        
        #if(completion_date and workout_type and distance != "0" and calories_burnt != "0" and time_taken != "0")
        return {'saved': True}

# getNewWorkouts class
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

# getWorkoutDetails class
class getWorkoutDetails(Resource):
    def get(self, workout_id):
        email = loggedin_user['email']
        workouts_array = users_new_workouts[email]
        workout_json = {}
        print(workouts_array)
        for workout in workouts_array:
            if(workout['id'] == int(workout_id)):
                workout_json = workout
                break

        return {'workout': workout_json}

# updateNewWorkout class
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
                with open('database/users_new_workouts.json', 'w') as write_file:
                    json.dump(users_new_workouts, write_file)
                break
        
        #if(completion_date and workout_type and distance != "0" and calories_burnt != "0" and time_taken != "0")
        return {'updated': True}

# deleteWorkout class
class deleteWorkout(Resource):
    def post(self):
        email = loggedin_user['email']
        parser.add_argument('id')

        args = parser.parse_args()

        workout_id = args['id']

        for workout in users_new_workouts[email]:
            if(workout['id'] == int(workout_id)):
                users_new_workouts[email].remove(workout)
                with open('database/users_new_workouts.json', 'w') as write_file:
                    json.dump(users_new_workouts, write_file)
                break

        return {'deleted': True}

# logWorkout class
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
        currentUserWeight = loggedin_user['weight']
        if (workout_type == 'Cycling'):
            METS = 10
        else:
            METS = 8
        time_taken_hours = (int(time_spent) / 60)
        workout = {}
        workout['id'] = len(users_old_workouts[email])
        workout['date'] = true_date
        workout['workout_type'] = workout_type
        workout['mapjson'] = mapjson
        workout['distance'] = round(float(distance),2)
        workout['calories_burnt'] = (METS*currentUserWeight)*time_taken_hours
        workout['time_spent'] = time_spent
        workout['pace'] = round((float(distance) / (float(time_spent)/60)),2)
    
        users_old_workouts[email].append(workout)
        with open('database/users_old_workouts.json', 'w') as write_file:
            json.dump(users_old_workouts, write_file)

        users_total_stats[email]['total_distance'] = users_total_stats[email]['total_distance'] + float(distance)
        users_total_stats[email]['total_calories'] = users_total_stats[email]['total_calories'] + float(calories_burnt)
        users_total_stats[email]['total_time'] = users_total_stats[email]['total_time'] + float(time_spent)
        with open('database/users_total_stats.json', 'w') as write_file:
            json.dump(users_total_stats, write_file)

        return {'saved': True}

# getOldWorkouts class
class getOldWorkouts(Resource):
    def get(self):
        email = loggedin_user['email']
        return {'list': users_old_workouts[email]}

# getOldWorkoutDetails class
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

# reUserWorkout class
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

# createNewGoal class
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
        with open('database/users_goals.json', 'w') as write_file:
	        json.dump(users_goals, write_file)

        return {'saved': True}        


# getGoalRecommendation class
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
                
# deleteGoal class 
class deleteGoal(Resource):
    def post(self):
        email = loggedin_user['email']

        parser.add_argument('id')

        args = parser.parse_args()

        goal_id = args['id']

        for goal in users_goals[email]:
            if(goal['id'] == int(goal_id)):
                users_goals[email].remove(goal)
                with open('database/users_goals.json', 'w') as write_file:
	                json.dump(users_goals, write_file)
                break

        return {'deleted': True}

# useRecommendation class
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
        with open('database/users_new_workouts.json', 'w') as write_file:
	        json.dump(users_new_workouts, write_file)

        for recommendation in users_recommendations[email]:
            if(recommendation['id'] == int(recommendation_id)):
                users_recommendations[email].remove(recommendation)
                with open('database/users_recommendations.json', 'w') as write_file:
	                json.dump(users_recommendations, write_file)
                break
        
        return {'saved': True}
          
# updateEmailPassword class
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
                    with open('database/users_new_workouts.json', 'w') as write_file:
	                    json.dump(users_new_workouts, write_file)

                    # users_old_workouts
                    old_workouts = users_old_workouts[old_email]
                    users_old_workouts[new_email] = old_workouts
                    del users_old_workouts[old_email]
                    with open('database/users_old_workouts.json', 'w') as write_file:
	                    json.dump(users_old_workouts, write_file)

                    # users_goals
                    goals = users_goals[old_email]
                    users_goals[new_email] = goals
                    del users_goals[old_email]
                    with open('database/users_goals.json', 'w') as write_file:
	                    json.dump(users_goals, write_file)

                    # users_recommendations
                    recommendations = users_recommendations[old_email]
                    users_recommendations[new_email] = recommendations
                    del users_recommendations[old_email]
                    with open('database/users_recommendations.json', 'w') as write_file:
	                    json.dump(users_recommendations, write_file)

                    # users_total_stats
                    total_stats = users_total_stats[old_email]
                    users_total_stats[new_email] = total_stats
                    del users_total_stats[old_email]
                    with open('database/users_total_stats.json', 'w') as write_file:
	                    json.dump(users_total_stats, write_file)

                    # users_personal_stats
                    personal_stats = users_personal_stats[old_email]
                    users_personal_stats[new_email] = personal_stats
                    del users_personal_stats[old_email]
                    with open('database/users_personal_stats.json', 'w') as write_file:
	                    json.dump(users_personal_stats, write_file)

        return {'updated': True}

# updateHeightWeight class
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
        with open('database/users_personal_stats.json', 'w') as write_file:
	        json.dump(users_personal_stats, write_file)

        return {'updated': True}

# getUserInfo class
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

# logSleep class
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
        with open('database/users_sleep.json', 'w') as write_file:
	        json.dump(users_sleep, write_file)

        return {'saved': True}

# getSleep class
class getSleep(Resource):
    def get(self):

        email = loggedin_user['email']

        return {'list': users_sleep[email]}

# getRecommendation class
class getRecommendation(Resource):
    def get(self, recommendation_id):

        email = loggedin_user['email']
        recommendation_json = {}

        for recommendation in users_recommendations[email]:
            if(recommendation['id'] == int(recommendation_id)):
                recommendation_json = recommendation
                break

        return {'recommendation': recommendation_json}
        
# completeWorkout class
class completeWorkout(Resource):
    def post(self, workout_id):

        email = loggedin_user['email']

        workout = {}
        w = {}
        for new_workout in users_new_workouts[email]:
            if(new_workout['id'] == int(workout_id)):
                workout = new_workout
                users_new_workouts[email].remove(new_workout)
                with open('database/users_new_workouts.json', 'w') as write_file:
	                json.dump(users_new_workouts, write_file)

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
        with open('database/users_old_workouts.json', 'w') as write_file:
	        json.dump(users_old_workouts, write_file)

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
