import React, { useState, useEffect } from 'react';

const ProgressTracker = () => {
    const [workouts, setWorkouts] = useState([
        { id: 1, name: 'Tabata at home', day: 'Today', completed: false, date: null },
        { id: 2, name: 'Resistance training at the gym', day: 'Tomorrow', completed: false, date: null },
        { id: 3, name: 'Rest', day: 'Sunday', completed: false, date: null },
        { id: 4, name: 'Treadmill at the gym', day: 'Monday', completed: false, date: null },
        { id: 5, name: 'Resistance training at home', day: 'Tuesday', completed: false, date: null },
        { id: 6, name: 'Rest', day: 'Wednesday', completed: false, date: null },
        { id: 7, name: 'Rest', day: 'Thursday', completed: false, date: null },
    ]);
    const [showBadge, setShowBadge] = useState(false);
    const [nextWeek,setNextWeek]=useState("");

    useEffect(() => {
        const savedWorkouts = JSON.parse(localStorage.getItem('workouts'));
        if (savedWorkouts) {
            setWorkouts(savedWorkouts);
        }
    }, []);

    const handleComplete = (id) => {
      setNextWeek("");
        const updatedWorkouts = workouts.map(workout => {
            if (workout.id === id) {
                workout.completed = !workout.completed;
                workout.date = workout.completed ? new Date().toLocaleDateString() : null;
            }
            return workout;
        });

        setWorkouts(updatedWorkouts);
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    };

    const getCompletedCount = () => {
        console.log('workouts.filter(workout => workout.completed).length: ', workouts.filter(workout => workout.completed).length);

        return workouts.filter(workout => workout.completed).length;
    };

    const handleSubmit = () => {
        setShowBadge(true);
        setNextWeek("Get ready for next week!")
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Left side with workout options */}
            <div style={{ width: '80%', padding: '20px' }}>
                <h1>Progress</h1>
                <h2>Workout - Week 1</h2>
                <ul>
                    {workouts.map(workout => (
                        <li key={workout.id} style={{
                            padding: 10,
                            fontSize: 18
                        }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={workout.completed}
                                    onChange={() => handleComplete(workout.id)}
                                />
                                {workout.name} - {workout.day} - {workout.completed && workout.date}
                            </label>
                        </li>
                    ))}
                </ul>
                <div style={{marginTop:"20px"}}>
                <button onClick={handleSubmit} style={{background:"transparent", border:"none",backgroundColor:"#763AB4",color:"#fff",padding:"15px 30px"}}>Submit</button>
                <p>{nextWeek}</p>
                </div>
            </div>

            {/* Right side with the badge */}
            <div style={{ width: '50%', padding: '20px', textAlign: 'center' }}>
                { (
                    getCompletedCount() == 7 ?
                        <>
                            <img style={{
                                width: '60%',
                                height: '60%',
                            }} src={require('./assets/first.png')}></img>
                            <p style={{
                            fontWeight: 600
                        }}>Excellent Workout!</p>
                        </>
                        :
                        getCompletedCount() > 5 ?
                            <>
                                <img style={{
                                    width: '60%',
                                    height: '60%',
                                }} src={require('./assets/second.png')}></img>
                                <p style={{
                                    fontWeight: 600
                                }}>Good Workout!</p>
                            </>
                            :
                                <>
                                    <img style={{
                                        width: '60%',
                                        height: '60%',
                                    }} src={require('./assets/sick.png')}></img>
                                    <p style={{
                                        fontWeight: 600
                                    }}>Average</p>
                                </>

                )}
            </div>
        </div>
    );
};

const ProgressBadge = ({ completed, total }) => {
    let badgeText = '';
    let badgeColor = '';

    if (completed === 1 || completed === 2) {
        badgeText = 'Beginner';
        badgeColor = '#ffcc00';
    } else if (completed >= 3 && completed < total) {
        badgeText = 'Met Expectation';
        badgeColor = '#3399ff';
    } else if (completed === total) {
        badgeText = 'Great! You are in Good Shape';
        badgeColor = '#76c7c0';
    }

    return (
        <div>
            <h3>Badge</h3>
            <div
                style={{
                    display: 'inline-block',
                    padding: '20px',
                    backgroundColor: badgeColor,
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1.5em',
                }}
            >
                {badgeText}
            </div>
        </div>
    );
};

export default ProgressTracker;
