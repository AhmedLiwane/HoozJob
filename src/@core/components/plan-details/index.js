// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Icons Imports
import CircleOutline from 'mdi-material-ui/CircleOutline'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useRouter } from 'next/router'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch } from 'react-redux'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import CompleteProfile from 'src/views/CompleteProfile'
import { useSelector } from 'react-redux'

// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 6, 6),
  borderRadius: theme.shape.borderRadius
}))

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(5),
  marginBottom: theme.spacing(5),
  '& > :not(:first-of-type)': {
    marginTop: theme.spacing(4)
  }
}))

const PlanDetails = props => {
  // ** States
  const [LoadingBtn, setLoadingButton] = useState(false)
  const [incomplete, setIncomplete] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const route = useRouter()

  const CompanyState = useSelector(state => state.CompanyReducer)
  const MemberState = useSelector(state => state.MemberState)

  // ** Props
  const { plan, data } = props

  const callBack = prop => {
    setIncomplete(prop)
  }

  const renderFeatures = () => {
    return data?.features.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CircleOutline sx={{ mr: 2.5, fontSize: '0.875rem', color: 'text.secondary' }} />
        <Typography variant='body2'>{item}</Typography>
      </Box>
    ))
  }

  return (
    <BoxWrapper
      sx={{
        border: theme =>
          !data?.popularPlan
            ? `1px solid ${theme.palette.divider}`
            : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      <CompleteProfile isOpen={incomplete} callBack={callBack} />

      {data?.popularPlan ? (
        <CustomChip
          skin='light'
          size='small'
          label='Popular'
          color='primary'
          sx={{
            top: 16,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 2.5,
              fontSize: '0.8125rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <img width={100} src={`${data?.imgSrc}`} height={100} alt={`${data?.title.toLowerCase()}-plan-img`} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          {data?.title}
        </Typography>
        <Typography variant='body2'>{data?.subtitle}</Typography>
        <Box sx={{ mt: 5, mb: 10, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='body2' sx={{ mt: 1.6, alignSelf: 'flex-start' }}>
              {data?.unit}
            </Typography>
            <Typography variant='h3' sx={{ fontWeight: 500, color: 'primary.main', lineHeight: 1.17 }}>
              {data?.price}
            </Typography>
            <Typography variant='body2' sx={{ mb: 1.6, alignSelf: 'flex-end' }}>
              /{plan}
            </Typography>
          </Box>
          <Typography
            variant='body2'
            sx={{ left: 0, right: 0, position: 'relative' }}
          >{`${data?.verifications} verifications`}</Typography>
          <Typography
            variant='body2'
            sx={{ left: 0, right: 0, position: 'absolute' }}
          >{`${data?.unit} ${data?.per_verif}/verification`}</Typography>
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      <LoadingButton
        loading={LoadingBtn}
        onClick={''}
        fullWidth
        color={data?.currentPlan ? 'success' : 'primary'}
        variant={data?.popularPlan ? 'contained' : 'outlined'}
      >
        {data?.currentPlan ? 'Your Current Plan' : 'Purchase'}
      </LoadingButton>
    </BoxWrapper>
  )
}

export default PlanDetails
