import _ from 'lodash'

// Theme Container
import ContainerGoldenGold from '@/components/theme/golden-gold/container'
import ContainerNashville from '@/components/theme/nashville/container'

function SwitchTheme({ options, data }) {
  const getThemeByCode = codeTheme => {
    switch (codeTheme) {
      case 'golden-gold':
        return <ContainerGoldenGold options={options} data={modify(data)} />
      case 'nashville':
        return <ContainerNashville options={options} data={modify(data)} />
      default:
        return ''
    }
  }

  // Modify
  const modify = item => {
    let modify = item

    if (options.from !== 'theme') {
      const feature = _.map(
        modify.feature,
        ({ is_active, theme_feature, column }) => {
          delete theme_feature.is_active
          column = _.map(
            column,
            ({ is_active, theme_feature_column, value }) => {
              return { is_active, ...theme_feature_column, value }
            }
          )
          return { is_active, ...theme_feature, column }
        }
      )

      modify = { ...modify, feature }
    } else {
      _.map(modify.feature, feature => {
        return _.map(feature.column, column => {
          column.is_active = true
          return column
        })
      })
    }

    return modify
  }

  return getThemeByCode(options.from === 'theme' ? data.code : data.theme.code)
}

export default SwitchTheme
