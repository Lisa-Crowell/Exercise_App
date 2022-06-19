import React, {useState, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import {Box, Stack, Typography} from "@mui/material";

import {exerciseOptions, fetchData} from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({exercises, setExercises, bodyPart}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 12;

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

    const paginate = (e, value) => {
        setCurrentPage(value);

        window.scrollTo({top: 1080, behavior: 'smooth'})
    }

    useEffect(() => {
        const fetchExercisesData = async () => {
            let exerciseData;

            if(bodyPart==='all') {
                exerciseData = await fetchData(process.env.REACT_APP_RAPID_API_EXERCISES_URL, exerciseOptions);
            }else {
                exerciseData = await fetchData(`${process.env.REACT_APP_RAPID_API_BODY_PART_URL}/${bodyPart}`,
                    exerciseOptions);
            }
            setExercises(exerciseData);
        }
        // noinspection JSIgnoredPromiseFromCall
        fetchExercisesData();
    }, [bodyPart, setExercises])

    return(
        <Box
            id={'exercises'}
            sx={{mt: {lg: '110px', xs: '50px'} }}
            mt={'50px'}
            p={'20px'}
        >
            <Typography
                variant={'h3'}
                fontWeight={'bold'}
                sx={{fontSize: {lg: '44px', xs:'30px'} }}
                mb={'46px'}
            >
                Showing Results
            </Typography>
            <Stack
                direction={'row'}
                sx={{gap: {lg:'110px', xs:'50px'} }}
                flexWrap={'wrap'}
                justifyContent={'center'}
            >
                {currentExercises.map((exercise, index) => (
                    <ExerciseCard
                        key={index}
                        exercise={exercise}
                    />
                ))}
            </Stack>
            <Stack
                sx={{mt: {lg:'114px', xs:'70px'} }}
                alignItems={'center'}
            >
                {exercises.length > 9 && (
                    <Pagination
                    color={'standard'}
                    shape={'rounded'}
                    defaultPage={1}
                    count={Math.ceil(exercises.length/exercisesPerPage)}
                    page={currentPage}
                    onChange={paginate}
                    size={'large'}
                    />
                )}
            </Stack>
        </Box>
    )
}

export default Exercises
