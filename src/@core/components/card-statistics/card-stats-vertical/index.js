// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import Refresh from 'mdi-material-ui/Refresh'
import { getNumbers } from 'src/redux/Statistics/action'
import { useDispatch } from 'react-redux'
import { CardHeader } from '@mui/material'

const CardStatsVertical = ({ title, chipText, stat }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** Props
  const trendNumber = Math.round(stat?.incrDecRate)
  const TrendIcon = trendNumber ? ChevronUp : ChevronDown

  const handleBackDrop = () => {
    dispatch(getNumbers())
  }

  return (
    <Card sx={{ position: 'relative', pr: 2 }}>
      <CardHeader title={title} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6' sx={{ mb: 1 }}>
          {stat.all}
        </Typography>
        <Typography variant='body2'>{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
