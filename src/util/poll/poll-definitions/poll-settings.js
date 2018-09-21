class PollSettings {
  static POLL_PRIVACY = {
    PUBLIC: 'PUBLIC',
    PRIVATE: 'PRIVATE',
  };

  static POLL_ITEM_FORMAT = {
    TEXT: 'TEXT',
    TEXT_WITH_IMAGE: 'TEXT_WITH_IMAGE',
    TEXT_WITH_IMAGES: 'TEXT_WITH_IMAGES',
    TEXT_WITH_VIDEO: 'TEXT_WITH_VIDEO',
  };

  static WHO_CAN_ADD_ITEM = {
    ANYONE: 'ANY',
    ONLY_CREATOR: 'CREATOR'
  };

  static defaultPollSettings = {
    endDatetime: 'infinite',
    privacy: PollSettings.POLL_PRIVACY.PUBLIC,
    itemFormat: PollSettings.POLL_ITEM_FORMAT.TEXT,
    whoCanAddItem: PollSettings.WHO_CAN_ADD_ITEM.ONLY_CREATOR
  };

  static VOTE_TYPES = {
    TICK_VOTE: 'TICK',
    NUMBER_VOTE_0_10: 'NUMBER10',
    NUMBER_VOTE_0_100: 'NUMBER100',
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