    //the function below was created by asaf blum.No changes were made.
    function makeCounter(counterId, initialValue = 0) {
        const id = counterId;
        let counter = initialValue;
    
        function changeValue(by) {
        counter = counter + by;
        return counter;
        }
    
        return {
        increment: function() {
            return changeValue(1);
        },
        decrement: function() {
            return changeValue(-1);
        },
        getCount: function() {
            return counter;
        },
        getID: function() {
            return id;
        },
        /**
         *
         * @param otherCounter the other counter to compare with the current
         * @returns 1 if current count is bigger, -1 if other count is bigger, else 0
         */
        compare: function(otherCounter) {
            const delta = this.getCount() - otherCounter.getCount();
    
            if (delta > 0) {
            return 1;
            }
    
            if (delta < 0) {
            return -1;
            }
    
            return 0;
        }
        };
    }