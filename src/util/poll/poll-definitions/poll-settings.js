import {POLL_ITEM_FORMAT_BASIC} from "./poll-item-format";

class PollSettings {
  static POLL_PRIVACY = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE',
  };

  static defaultPollSettings = {
    endDatetime: '-',
    privacy: PollSettings.POLL_PRIVACY.PUBLIC,
    itemFormat: POLL_ITEM_FORMAT_BASIC,
  };

  constructor(_settings) {
    if (!_settings.startDatetime || !_settings.creatorId || !_settings.title) {
      throw new Error('cannot create poll settings');
    }

    let settings = Object.assign({}, PollSettings.defaultPollSettings, _settings);
    for (let key in settings) {
      if (settings.hasOwnProperty(key)) {
        this[key] = settings[key];
      }
    }
  };
}

export default PollSettings;