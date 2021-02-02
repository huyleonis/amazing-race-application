import { extend } from 'vee-validate'
import Regex from '@utils/regex'

// TODO: use vue-i18n in combine with vee-validate to provide internationalization support for this app

extend('colorHexa', {
  validate: (value) => !value || Regex.isColorCode(value), // empty string should be checked with `required` rule.
})

extend('localDateAfter', {
  validate: (value, { start }) =>
    !value || !start || new Date(value).getTime() > new Date(start).getTime(),
  message: 'Date must after start date',
  params: [
    {
      name: 'start',
      isTarget: true,
    },
  ],
})

extend('localDateInRange', {
  validate: (value, { start, end }) => {
    if (!value) {
      return true
    }
    const valueTime = new Date(value).getTime()
    return (
      (!start || valueTime >= new Date(start).getTime()) &&
      (!end || valueTime <= new Date(end).getTime())
    )
  },
  message: (field, { start, end }) => `Date must in range ${start} -> ${end}`,
  params: ['start', 'end'],
})

// Specific rules, which will be applied in a specific case only, not global ones

/**
 * Rule to be applied in Media Section {@link MediaSection}
 * To make sure that at least one Media:
 *  - doesn't have `exposedTime` prop (will be set as Story start time if missing)
 *  - have `exposedTime` value less than or equal Story start time
 * @param {Media[]}   medias    A list of Media
 * @param {String}    time      Story start time, a string time represented in ISO-8601 format
 */
extend('atLeastOneMediaIsExposedFrom', {
  validate: (medias, { time }) =>
    !medias ||
    !time ||
    medias.some(
      (media) =>
        !media.exposedTime ||
        new Date(media.exposedTime).getTime() <= new Date(time).getTime()
    ),
  message: (field, { time }) =>
    `At least one media has to be exposed when starting story (${time})`,
  params: ['time'],
})
