import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import SettingsModal from './SettingsModal'

type Props = {
  color?: string
  mr?: string
  iconPencil?: boolean
}

const GlobalSettings = ({ color, mr = '8px', iconPencil = false }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex>
        <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr={mr} id="open-settings-dialog-button">
          { !iconPencil && <CogIcon height={24} width={24} color={color || 'textSubtle'} />}
          { iconPencil && (
            <svg viewBox="0 0 16 16" height="14px" width="20px" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '0.5rem'}}>
              <path fillRule="evenodd" clipRule="evenodd" d="M13.806 3.754c.26.26.26.68 0 .94l-1.22 1.22-2.5-2.5 1.22-1.22a.664.664 0 01.94 0l1.56 1.56zM1.999 13.668V11.64c0-.093.033-.173.1-.24l7.273-7.273 2.5 2.5-7.28 7.273a.313.313 0 01-.233.1H2.332A.33.33 0 012 13.668z"></path>
            </svg>
          )}
        </IconButton>
    </Flex>
  )
}

export default GlobalSettings
