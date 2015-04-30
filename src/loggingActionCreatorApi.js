/* global lux, moment, _ */

var logLevels = [ "error", "warn", "info", "debug" ];

function formatLogEntry( type, data ) {
	return {
		msg: data,
		timestamp: moment.utc().toISOString(),
		type: type,
		level: logLevels.indexOf( type ) + 1
	};
}

function logIt( type, data ) {
	lux.publishAction( "sendLogEntry", formatLogEntry( type, data ) );
}

var loggingApi = _.reduce(
	logLevels,
	( acc, level ) => {
		acc[ level ] = function( data ) {
			return logIt( level, data );
		};
		return acc;
	},
	{}
);

lux.customActionCreator( loggingApi );

lux.addToActionGroup( "logging", logLevels );
