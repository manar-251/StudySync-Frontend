import { useEffect, useState } from 'react';
import * as wellnessLogService from '../../services/wellnessLogService';
import styles from './Wellness.module.css';

const emptyForm = {
  date: '',
  waterGlasses: 0,
  exerciseMinutes: 0,
  sleepHours: 0,
};



export default Wellness;
