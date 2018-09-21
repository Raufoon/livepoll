class PollSettings {
  static POLL_PRIVACY = {
    PUBLIC: 'pb',
    PRIVATE: 'pr',
  };

  static POLL_ITEM_FORMAT = {
    TEXT: 't',
    TEXT_WITH_IMAGE: 'ti',
    TEXT_WITH_IMAGES: 'ti*',
    TEXT_WITH_VIDEO: 'tv',
  };

  static WHO_CAN_ADD_ITEM = {
    ANYONE: 'a',
    ONLY_CREATOR: 'c'
  };

  static defaultPollSettings = {
    endDatetime: undefined,
    privacy: PollSettings.POLL_PRIVACY.PUBLIC,
    itemFormat: PollSettings.POLL_ITEM_FORMAT.TEXT,
    whoCanAddItem: PollSettings.WHO_CAN_ADD_ITEM.ONLY_CREATOR,
  };

  static VOTE_TYPES = {
    TICK_VOTE: 't',
    NUMBER_VOTE_0_10: 'n10',
    NUMBER_VOTE_0_100: 'n100',
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