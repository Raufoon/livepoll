class PollSettings {
  static POLL_PRIVACY = {
    PUBLIC: 'PB',
    PRIVATE: 'PR',
  };

  static POLL_ITEM_FORMAT = {
    TEXT: 'T',
    TEXT_WITH_IMAGE: 'TI',
    TEXT_WITH_IMAGES: 'TII',
    TEXT_WITH_VIDEO: 'TV',
  };

  static WHO_CAN_ADD_ITEM = {
    ANYONE: 'A',
    ONLY_CREATOR: 'C'
  };

  static defaultPollSettings = {
    endDatetime: 'infinite',
    privacy: PollSettings.POLL_PRIVACY.PUBLIC,
    itemFormat: PollSettings.POLL_ITEM_FORMAT.TEXT,
    whoCanAddItem: PollSettings.WHO_CAN_ADD_ITEM.ONLY_CREATOR
  };

  static VOTE_TYPES = {
    TICK_VOTE: 'T',
    NUMBER_VOTE_0_10: 'N10',
    NUMBER_VOTE_0_100: 'N100',
  };

  constructor(_settings) {
    if (!_settings.creatorId || !_settings.title) {
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