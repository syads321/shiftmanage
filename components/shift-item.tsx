
import React, { FC } from "react";
import { Card, Button, Icon } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
interface Props {
    title: String,
    starthour: String,
    endhour: String,
    multiplier: number,
    date: string,
    // any props that come into the component
}


const ShiftItem: FC<Props> = (prop) => {
    const getPosition = (hour: String, multiplier: number) => {
        return multiplier * parseInt(hour.split(':')[0])
    }
    const leftCounter = (hour: String) => {
        return 65 + (4 * parseInt(hour.split(':')[0]))
    }
    const getHeight = (starthour: String, endhour: String, multiplier: number) => {
        const totalHour = parseInt(endhour.split(':')[0]) - parseInt(starthour.split(':')[0])
        const currentHeight = 125;
        return Math.max(currentHeight, (totalHour) * multiplier)
    }
    const dispatch = useDispatch()
    return <div className="slot-item--wrapper" style={{ top: getPosition(prop.starthour, prop.multiplier), left: leftCounter(prop.starthour) }}>
        <Card className="timeslot" style={{height : getHeight(prop.starthour, prop.endhour, prop.multiplier)}}>
            <Card.Content>
                <Card.Header>{prop.title}</Card.Header>
                <Card.Meta><strong>{prop.starthour}</strong> - <strong>{prop.endhour}</strong></Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' onClick={
                        () => {
                            dispatch({
                                type: 'EDIT_MODE',
                                editShiftMode: true,
                                shiftaddmode: false,
                                item: {
                                    title: prop.title,
                                    starthour: prop.starthour,
                                    endhour: prop.endhour,
                                    date: prop.date
                                }
                            })
                        }
                    }>
                        Edit
                    </Button>
                    <Button basic color='red'>
                        Delete
                    </Button>
                </div>
            </Card.Content>
        </Card>
        <style jsx>{`
   .slot-item--wrapper {
       position:absolute;
       left: 80px;
       width: 60%;
   }
  `}</style>
    </div>


};
export default ShiftItem