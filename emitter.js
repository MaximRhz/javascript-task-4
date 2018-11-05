'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const totalEvents = {};

    function subscribeToAnEvent(event, context, handler) {
        if (!totalEvents[event]) {
            totalEvents[event] = [];
        }
        totalEvents[event].push({ context, handler });
    }

    function unsubscribeFromTheEvent(event, context) {
        const sortedKeys = Object.keys(totalEvents)
            .filter(key => key === event || key.startsWith(`${event}.`));
        sortedKeys.forEach(key => {
            totalEvents[key] = totalEvents[key].filter(learner => learner.context !== context);
        });
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {any}
         */
        on: function (event, context, handler) {
            subscribeToAnEvent(event, context, handler);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {any}
         */
        off: function (event, context) {
            unsubscribeFromTheEvent(event, context);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {any}
         */
        emit: function (event) {
            if (totalEvents[event]) {
                totalEvents[event].forEach(learner => learner.handler.call(learner.context));
            }

            if (/\./.test(event)) {
                event = event.slice(0, event.lastIndexOf('.'));
                this.emit(event);
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
