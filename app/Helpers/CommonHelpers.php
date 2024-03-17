<?php

namespace App\Helpers;

class CommonHelpers {
    /**
     * Error Processor
     *
     * @param $validator
     * @return array
     */
    public static function error_processor($validator) {
        $err_keeper = [];
        if(null !== $validator->errors() && null !== $validator->errors()->getMessages()){
            foreach ($validator->errors()->getMessages() as $index => $error) {
                array_push($err_keeper, ['code' => $index, 'message' => $error[0]]);
            }
        }

        return $err_keeper;
    }
}
