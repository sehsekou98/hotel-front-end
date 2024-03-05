import {useState} from 'react';
import "react-date-range/dist/styles.css"; // main css
import  "react-date-range/dist/theme/default.css" ;// theme css 
import {DateRangePicker} from "react-date-range"
import PropTypes from 'prop-types';



const DateSlider = ({ onDateChange, onFilterChange}) => {
     const [dateRange, setDateRange] = useState({
      startDate: undefined,
      endDate: undefined,
      key: "selection"
     })

     const handleSelect = (ranges) => {
      setDateRange(ranges.selection);
      onDateChange(ranges.selection.startDate, ranges.selection.endDate)
      onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
     }

     const handleClearFilter = () => {
      setDateRange({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
      })
      onDateChange(null, null)
      onFilterChange(null, null)
     }
  return (
    <>
    <h5>Select a booking date</h5>
    <DateRangePicker ranges={[dateRange]} onChange={handleSelect} className="mb-4" />
    <button className="btn btn-secondary" onClick={handleClearFilter}>Clear Filter</button>
    </>
  )
}

DateSlider.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired
};


export default DateSlider