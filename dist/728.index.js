exports.id = 728;
exports.ids = [728];
exports.modules = {

/***/ 97656:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Contains the list of OpenAPI data types
 * as defined by https://swagger.io/docs/specification/data-models/data-types/
 * @public
 */
exports.SchemaType = void 0;
(function (SchemaType) {
    /** String type. */
    SchemaType["STRING"] = "string";
    /** Number type. */
    SchemaType["NUMBER"] = "number";
    /** Integer type. */
    SchemaType["INTEGER"] = "integer";
    /** Boolean type. */
    SchemaType["BOOLEAN"] = "boolean";
    /** Array type. */
    SchemaType["ARRAY"] = "array";
    /** Object type. */
    SchemaType["OBJECT"] = "object";
})(exports.SchemaType || (exports.SchemaType = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @public
 */
exports.ExecutableCodeLanguage = void 0;
(function (ExecutableCodeLanguage) {
    ExecutableCodeLanguage["LANGUAGE_UNSPECIFIED"] = "language_unspecified";
    ExecutableCodeLanguage["PYTHON"] = "python";
})(exports.ExecutableCodeLanguage || (exports.ExecutableCodeLanguage = {}));
/**
 * Possible outcomes of code execution.
 * @public
 */
exports.Outcome = void 0;
(function (Outcome) {
    /**
     * Unspecified status. This value should not be used.
     */
    Outcome["OUTCOME_UNSPECIFIED"] = "outcome_unspecified";
    /**
     * Code execution completed successfully.
     */
    Outcome["OUTCOME_OK"] = "outcome_ok";
    /**
     * Code execution finished but with a failure. `stderr` should contain the
     * reason.
     */
    Outcome["OUTCOME_FAILED"] = "outcome_failed";
    /**
     * Code execution ran for too long, and was cancelled. There may or may not
     * be a partial output present.
     */
    Outcome["OUTCOME_DEADLINE_EXCEEDED"] = "outcome_deadline_exceeded";
})(exports.Outcome || (exports.Outcome = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Possible roles.
 * @public
 */
const POSSIBLE_ROLES = ["user", "model", "function", "system"];
/**
 * Harm categories that would cause prompts or candidates to be blocked.
 * @public
 */
exports.HarmCategory = void 0;
(function (HarmCategory) {
    HarmCategory["HARM_CATEGORY_UNSPECIFIED"] = "HARM_CATEGORY_UNSPECIFIED";
    HarmCategory["HARM_CATEGORY_HATE_SPEECH"] = "HARM_CATEGORY_HATE_SPEECH";
    HarmCategory["HARM_CATEGORY_SEXUALLY_EXPLICIT"] = "HARM_CATEGORY_SEXUALLY_EXPLICIT";
    HarmCategory["HARM_CATEGORY_HARASSMENT"] = "HARM_CATEGORY_HARASSMENT";
    HarmCategory["HARM_CATEGORY_DANGEROUS_CONTENT"] = "HARM_CATEGORY_DANGEROUS_CONTENT";
    HarmCategory["HARM_CATEGORY_CIVIC_INTEGRITY"] = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(exports.HarmCategory || (exports.HarmCategory = {}));
/**
 * Threshold above which a prompt or candidate will be blocked.
 * @public
 */
exports.HarmBlockThreshold = void 0;
(function (HarmBlockThreshold) {
    /** Threshold is unspecified. */
    HarmBlockThreshold["HARM_BLOCK_THRESHOLD_UNSPECIFIED"] = "HARM_BLOCK_THRESHOLD_UNSPECIFIED";
    /** Content with NEGLIGIBLE will be allowed. */
    HarmBlockThreshold["BLOCK_LOW_AND_ABOVE"] = "BLOCK_LOW_AND_ABOVE";
    /** Content with NEGLIGIBLE and LOW will be allowed. */
    HarmBlockThreshold["BLOCK_MEDIUM_AND_ABOVE"] = "BLOCK_MEDIUM_AND_ABOVE";
    /** Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed. */
    HarmBlockThreshold["BLOCK_ONLY_HIGH"] = "BLOCK_ONLY_HIGH";
    /** All content will be allowed. */
    HarmBlockThreshold["BLOCK_NONE"] = "BLOCK_NONE";
})(exports.HarmBlockThreshold || (exports.HarmBlockThreshold = {}));
/**
 * Probability that a prompt or candidate matches a harm category.
 * @public
 */
exports.HarmProbability = void 0;
(function (HarmProbability) {
    /** Probability is unspecified. */
    HarmProbability["HARM_PROBABILITY_UNSPECIFIED"] = "HARM_PROBABILITY_UNSPECIFIED";
    /** Content has a negligible chance of being unsafe. */
    HarmProbability["NEGLIGIBLE"] = "NEGLIGIBLE";
    /** Content has a low chance of being unsafe. */
    HarmProbability["LOW"] = "LOW";
    /** Content has a medium chance of being unsafe. */
    HarmProbability["MEDIUM"] = "MEDIUM";
    /** Content has a high chance of being unsafe. */
    HarmProbability["HIGH"] = "HIGH";
})(exports.HarmProbability || (exports.HarmProbability = {}));
/**
 * Reason that a prompt was blocked.
 * @public
 */
exports.BlockReason = void 0;
(function (BlockReason) {
    // A blocked reason was not specified.
    BlockReason["BLOCKED_REASON_UNSPECIFIED"] = "BLOCKED_REASON_UNSPECIFIED";
    // Content was blocked by safety settings.
    BlockReason["SAFETY"] = "SAFETY";
    // Content was blocked, but the reason is uncategorized.
    BlockReason["OTHER"] = "OTHER";
})(exports.BlockReason || (exports.BlockReason = {}));
/**
 * Reason that a candidate finished.
 * @public
 */
exports.FinishReason = void 0;
(function (FinishReason) {
    // Default value. This value is unused.
    FinishReason["FINISH_REASON_UNSPECIFIED"] = "FINISH_REASON_UNSPECIFIED";
    // Natural stop point of the model or provided stop sequence.
    FinishReason["STOP"] = "STOP";
    // The maximum number of tokens as specified in the request was reached.
    FinishReason["MAX_TOKENS"] = "MAX_TOKENS";
    // The candidate content was flagged for safety reasons.
    FinishReason["SAFETY"] = "SAFETY";
    // The candidate content was flagged for recitation reasons.
    FinishReason["RECITATION"] = "RECITATION";
    // The candidate content was flagged for using an unsupported language.
    FinishReason["LANGUAGE"] = "LANGUAGE";
    // Token generation stopped because the content contains forbidden terms.
    FinishReason["BLOCKLIST"] = "BLOCKLIST";
    // Token generation stopped for potentially containing prohibited content.
    FinishReason["PROHIBITED_CONTENT"] = "PROHIBITED_CONTENT";
    // Token generation stopped because the content potentially contains Sensitive Personally Identifiable Information (SPII).
    FinishReason["SPII"] = "SPII";
    // The function call generated by the model is invalid.
    FinishReason["MALFORMED_FUNCTION_CALL"] = "MALFORMED_FUNCTION_CALL";
    // Unknown reason.
    FinishReason["OTHER"] = "OTHER";
})(exports.FinishReason || (exports.FinishReason = {}));
/**
 * Task type for embedding content.
 * @public
 */
exports.TaskType = void 0;
(function (TaskType) {
    TaskType["TASK_TYPE_UNSPECIFIED"] = "TASK_TYPE_UNSPECIFIED";
    TaskType["RETRIEVAL_QUERY"] = "RETRIEVAL_QUERY";
    TaskType["RETRIEVAL_DOCUMENT"] = "RETRIEVAL_DOCUMENT";
    TaskType["SEMANTIC_SIMILARITY"] = "SEMANTIC_SIMILARITY";
    TaskType["CLASSIFICATION"] = "CLASSIFICATION";
    TaskType["CLUSTERING"] = "CLUSTERING";
})(exports.TaskType || (exports.TaskType = {}));
/**
 * @public
 */
exports.FunctionCallingMode = void 0;
(function (FunctionCallingMode) {
    // Unspecified function calling mode. This value should not be used.
    FunctionCallingMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Default model behavior, model decides to predict either a function call
    // or a natural language repspose.
    FunctionCallingMode["AUTO"] = "AUTO";
    // Model is constrained to always predicting a function call only.
    // If "allowed_function_names" are set, the predicted function call will be
    // limited to any one of "allowed_function_names", else the predicted
    // function call will be any one of the provided "function_declarations".
    FunctionCallingMode["ANY"] = "ANY";
    // Model will not predict any function call. Model behavior is same as when
    // not passing any function declarations.
    FunctionCallingMode["NONE"] = "NONE";
})(exports.FunctionCallingMode || (exports.FunctionCallingMode = {}));
/**
 * The mode of the predictor to be used in dynamic retrieval.
 * @public
 */
exports.DynamicRetrievalMode = void 0;
(function (DynamicRetrievalMode) {
    // Unspecified function calling mode. This value should not be used.
    DynamicRetrievalMode["MODE_UNSPECIFIED"] = "MODE_UNSPECIFIED";
    // Run retrieval only when system decides it is necessary.
    DynamicRetrievalMode["MODE_DYNAMIC"] = "MODE_DYNAMIC";
})(exports.DynamicRetrievalMode || (exports.DynamicRetrievalMode = {}));

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Basic error type for this SDK.
 * @public
 */
class GoogleGenerativeAIError extends Error {
    constructor(message) {
        super(`[GoogleGenerativeAI Error]: ${message}`);
    }
}
/**
 * Errors in the contents of a response from the model. This includes parsing
 * errors, or responses including a safety block reason.
 * @public
 */
class GoogleGenerativeAIResponseError extends GoogleGenerativeAIError {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}
/**
 * Error class covering HTTP errors when calling the server. Includes HTTP
 * status, statusText, and optional details, if provided in the server response.
 * @public
 */
class GoogleGenerativeAIFetchError extends GoogleGenerativeAIError {
    constructor(message, status, statusText, errorDetails) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.errorDetails = errorDetails;
    }
}
/**
 * Errors in the contents of a request originating from user input.
 * @public
 */
class GoogleGenerativeAIRequestInputError extends GoogleGenerativeAIError {
}
/**
 * Error thrown when a request is aborted, either due to a timeout or
 * intentional cancellation by the user.
 * @public
 */
class GoogleGenerativeAIAbortError extends GoogleGenerativeAIError {
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com";
const DEFAULT_API_VERSION = "v1beta";
/**
 * We can't `require` package.json if this runs on web. We will use rollup to
 * swap in the version number here at build time.
 */
const PACKAGE_VERSION = "0.24.1";
const PACKAGE_LOG_HEADER = "genai-js";
var Task;
(function (Task) {
    Task["GENERATE_CONTENT"] = "generateContent";
    Task["STREAM_GENERATE_CONTENT"] = "streamGenerateContent";
    Task["COUNT_TOKENS"] = "countTokens";
    Task["EMBED_CONTENT"] = "embedContent";
    Task["BATCH_EMBED_CONTENTS"] = "batchEmbedContents";
})(Task || (Task = {}));
class RequestUrl {
    constructor(model, task, apiKey, stream, requestOptions) {
        this.model = model;
        this.task = task;
        this.apiKey = apiKey;
        this.stream = stream;
        this.requestOptions = requestOptions;
    }
    toString() {
        var _a, _b;
        const apiVersion = ((_a = this.requestOptions) === null || _a === void 0 ? void 0 : _a.apiVersion) || DEFAULT_API_VERSION;
        const baseUrl = ((_b = this.requestOptions) === null || _b === void 0 ? void 0 : _b.baseUrl) || DEFAULT_BASE_URL;
        let url = `${baseUrl}/${apiVersion}/${this.model}:${this.task}`;
        if (this.stream) {
            url += "?alt=sse";
        }
        return url;
    }
}
/**
 * Simple, but may become more complex if we add more versions to log.
 */
function getClientHeaders(requestOptions) {
    const clientHeaders = [];
    if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.apiClient) {
        clientHeaders.push(requestOptions.apiClient);
    }
    clientHeaders.push(`${PACKAGE_LOG_HEADER}/${PACKAGE_VERSION}`);
    return clientHeaders.join(" ");
}
async function getHeaders(url) {
    var _a;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-goog-api-client", getClientHeaders(url.requestOptions));
    headers.append("x-goog-api-key", url.apiKey);
    let customHeaders = (_a = url.requestOptions) === null || _a === void 0 ? void 0 : _a.customHeaders;
    if (customHeaders) {
        if (!(customHeaders instanceof Headers)) {
            try {
                customHeaders = new Headers(customHeaders);
            }
            catch (e) {
                throw new GoogleGenerativeAIRequestInputError(`unable to convert customHeaders value ${JSON.stringify(customHeaders)} to Headers: ${e.message}`);
            }
        }
        for (const [headerName, headerValue] of customHeaders.entries()) {
            if (headerName === "x-goog-api-key") {
                throw new GoogleGenerativeAIRequestInputError(`Cannot set reserved header name ${headerName}`);
            }
            else if (headerName === "x-goog-api-client") {
                throw new GoogleGenerativeAIRequestInputError(`Header name ${headerName} can only be set using the apiClient field`);
            }
            headers.append(headerName, headerValue);
        }
    }
    return headers;
}
async function constructModelRequest(model, task, apiKey, stream, body, requestOptions) {
    const url = new RequestUrl(model, task, apiKey, stream, requestOptions);
    return {
        url: url.toString(),
        fetchOptions: Object.assign(Object.assign({}, buildFetchOptions(requestOptions)), { method: "POST", headers: await getHeaders(url), body }),
    };
}
async function makeModelRequest(model, task, apiKey, stream, body, requestOptions = {}, 
// Allows this to be stubbed for tests
fetchFn = fetch) {
    const { url, fetchOptions } = await constructModelRequest(model, task, apiKey, stream, body, requestOptions);
    return makeRequest(url, fetchOptions, fetchFn);
}
async function makeRequest(url, fetchOptions, fetchFn = fetch) {
    let response;
    try {
        response = await fetchFn(url, fetchOptions);
    }
    catch (e) {
        handleResponseError(e, url);
    }
    if (!response.ok) {
        await handleResponseNotOk(response, url);
    }
    return response;
}
function handleResponseError(e, url) {
    let err = e;
    if (err.name === "AbortError") {
        err = new GoogleGenerativeAIAbortError(`Request aborted when fetching ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    else if (!(e instanceof GoogleGenerativeAIFetchError ||
        e instanceof GoogleGenerativeAIRequestInputError)) {
        err = new GoogleGenerativeAIError(`Error fetching from ${url.toString()}: ${e.message}`);
        err.stack = e.stack;
    }
    throw err;
}
async function handleResponseNotOk(response, url) {
    let message = "";
    let errorDetails;
    try {
        const json = await response.json();
        message = json.error.message;
        if (json.error.details) {
            message += ` ${JSON.stringify(json.error.details)}`;
            errorDetails = json.error.details;
        }
    }
    catch (e) {
        // ignored
    }
    throw new GoogleGenerativeAIFetchError(`Error fetching from ${url.toString()}: [${response.status} ${response.statusText}] ${message}`, response.status, response.statusText, errorDetails);
}
/**
 * Generates the request options to be passed to the fetch API.
 * @param requestOptions - The user-defined request options.
 * @returns The generated request options.
 */
function buildFetchOptions(requestOptions) {
    const fetchOptions = {};
    if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) !== undefined || (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
        const controller = new AbortController();
        if ((requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.timeout) >= 0) {
            setTimeout(() => controller.abort(), requestOptions.timeout);
        }
        if (requestOptions === null || requestOptions === void 0 ? void 0 : requestOptions.signal) {
            requestOptions.signal.addEventListener("abort", () => {
                controller.abort();
            });
        }
        fetchOptions.signal = controller.signal;
    }
    return fetchOptions;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Adds convenience helper methods to a response object, including stream
 * chunks (as long as each chunk is a complete GenerateContentResponse JSON).
 */
function addHelpers(response) {
    response.text = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning text from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getText(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Text not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return "";
    };
    /**
     * TODO: remove at next major version
     */
    response.functionCall = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            console.warn(`response.functionCall() is deprecated. ` +
                `Use response.functionCalls() instead.`);
            return getFunctionCalls(response)[0];
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    response.functionCalls = () => {
        if (response.candidates && response.candidates.length > 0) {
            if (response.candidates.length > 1) {
                console.warn(`This response had ${response.candidates.length} ` +
                    `candidates. Returning function calls from the first candidate only. ` +
                    `Access response.candidates directly to use the other candidates.`);
            }
            if (hadBadFinishReason(response.candidates[0])) {
                throw new GoogleGenerativeAIResponseError(`${formatBlockErrorMessage(response)}`, response);
            }
            return getFunctionCalls(response);
        }
        else if (response.promptFeedback) {
            throw new GoogleGenerativeAIResponseError(`Function call not available. ${formatBlockErrorMessage(response)}`, response);
        }
        return undefined;
    };
    return response;
}
/**
 * Returns all text found in all parts of first candidate.
 */
function getText(response) {
    var _a, _b, _c, _d;
    const textStrings = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.text) {
                textStrings.push(part.text);
            }
            if (part.executableCode) {
                textStrings.push("\n```" +
                    part.executableCode.language +
                    "\n" +
                    part.executableCode.code +
                    "\n```\n");
            }
            if (part.codeExecutionResult) {
                textStrings.push("\n```\n" + part.codeExecutionResult.output + "\n```\n");
            }
        }
    }
    if (textStrings.length > 0) {
        return textStrings.join("");
    }
    else {
        return "";
    }
}
/**
 * Returns functionCall of first candidate.
 */
function getFunctionCalls(response) {
    var _a, _b, _c, _d;
    const functionCalls = [];
    if ((_b = (_a = response.candidates) === null || _a === void 0 ? void 0 : _a[0].content) === null || _b === void 0 ? void 0 : _b.parts) {
        for (const part of (_d = (_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0].content) === null || _d === void 0 ? void 0 : _d.parts) {
            if (part.functionCall) {
                functionCalls.push(part.functionCall);
            }
        }
    }
    if (functionCalls.length > 0) {
        return functionCalls;
    }
    else {
        return undefined;
    }
}
const badFinishReasons = [
    exports.FinishReason.RECITATION,
    exports.FinishReason.SAFETY,
    exports.FinishReason.LANGUAGE,
];
function hadBadFinishReason(candidate) {
    return (!!candidate.finishReason &&
        badFinishReasons.includes(candidate.finishReason));
}
function formatBlockErrorMessage(response) {
    var _a, _b, _c;
    let message = "";
    if ((!response.candidates || response.candidates.length === 0) &&
        response.promptFeedback) {
        message += "Response was blocked";
        if ((_a = response.promptFeedback) === null || _a === void 0 ? void 0 : _a.blockReason) {
            message += ` due to ${response.promptFeedback.blockReason}`;
        }
        if ((_b = response.promptFeedback) === null || _b === void 0 ? void 0 : _b.blockReasonMessage) {
            message += `: ${response.promptFeedback.blockReasonMessage}`;
        }
    }
    else if ((_c = response.candidates) === null || _c === void 0 ? void 0 : _c[0]) {
        const firstCandidate = response.candidates[0];
        if (hadBadFinishReason(firstCandidate)) {
            message += `Candidate was blocked due to ${firstCandidate.finishReason}`;
            if (firstCandidate.finishMessage) {
                message += `: ${firstCandidate.finishMessage}`;
            }
        }
    }
    return message;
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 */
function processStream(response) {
    const inputStream = response.body.pipeThrough(new TextDecoderStream("utf8", { fatal: true }));
    const responseStream = getResponseStream(inputStream);
    const [stream1, stream2] = responseStream.tee();
    return {
        stream: generateResponseSequence(stream1),
        response: getResponsePromise(stream2),
    };
}
async function getResponsePromise(stream) {
    const allResponses = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            return addHelpers(aggregateResponses(allResponses));
        }
        allResponses.push(value);
    }
}
function generateResponseSequence(stream) {
    return __asyncGenerator(this, arguments, function* generateResponseSequence_1() {
        const reader = stream.getReader();
        while (true) {
            const { value, done } = yield __await(reader.read());
            if (done) {
                break;
            }
            yield yield __await(addHelpers(value));
        }
    });
}
/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 */
function getResponseStream(inputStream) {
    const reader = inputStream.getReader();
    const stream = new ReadableStream({
        start(controller) {
            let currentText = "";
            return pump();
            function pump() {
                return reader
                    .read()
                    .then(({ value, done }) => {
                    if (done) {
                        if (currentText.trim()) {
                            controller.error(new GoogleGenerativeAIError("Failed to parse stream"));
                            return;
                        }
                        controller.close();
                        return;
                    }
                    currentText += value;
                    let match = currentText.match(responseLineRE);
                    let parsedResponse;
                    while (match) {
                        try {
                            parsedResponse = JSON.parse(match[1]);
                        }
                        catch (e) {
                            controller.error(new GoogleGenerativeAIError(`Error parsing JSON response: "${match[1]}"`));
                            return;
                        }
                        controller.enqueue(parsedResponse);
                        currentText = currentText.substring(match[0].length);
                        match = currentText.match(responseLineRE);
                    }
                    return pump();
                })
                    .catch((e) => {
                    let err = e;
                    err.stack = e.stack;
                    if (err.name === "AbortError") {
                        err = new GoogleGenerativeAIAbortError("Request aborted when reading from the stream");
                    }
                    else {
                        err = new GoogleGenerativeAIError("Error reading from the stream");
                    }
                    throw err;
                });
            }
        },
    });
    return stream;
}
/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 */
function aggregateResponses(responses) {
    const lastResponse = responses[responses.length - 1];
    const aggregatedResponse = {
        promptFeedback: lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.promptFeedback,
    };
    for (const response of responses) {
        if (response.candidates) {
            let candidateIndex = 0;
            for (const candidate of response.candidates) {
                if (!aggregatedResponse.candidates) {
                    aggregatedResponse.candidates = [];
                }
                if (!aggregatedResponse.candidates[candidateIndex]) {
                    aggregatedResponse.candidates[candidateIndex] = {
                        index: candidateIndex,
                    };
                }
                // Keep overwriting, the last one will be final
                aggregatedResponse.candidates[candidateIndex].citationMetadata =
                    candidate.citationMetadata;
                aggregatedResponse.candidates[candidateIndex].groundingMetadata =
                    candidate.groundingMetadata;
                aggregatedResponse.candidates[candidateIndex].finishReason =
                    candidate.finishReason;
                aggregatedResponse.candidates[candidateIndex].finishMessage =
                    candidate.finishMessage;
                aggregatedResponse.candidates[candidateIndex].safetyRatings =
                    candidate.safetyRatings;
                /**
                 * Candidates should always have content and parts, but this handles
                 * possible malformed responses.
                 */
                if (candidate.content && candidate.content.parts) {
                    if (!aggregatedResponse.candidates[candidateIndex].content) {
                        aggregatedResponse.candidates[candidateIndex].content = {
                            role: candidate.content.role || "user",
                            parts: [],
                        };
                    }
                    const newPart = {};
                    for (const part of candidate.content.parts) {
                        if (part.text) {
                            newPart.text = part.text;
                        }
                        if (part.functionCall) {
                            newPart.functionCall = part.functionCall;
                        }
                        if (part.executableCode) {
                            newPart.executableCode = part.executableCode;
                        }
                        if (part.codeExecutionResult) {
                            newPart.codeExecutionResult = part.codeExecutionResult;
                        }
                        if (Object.keys(newPart).length === 0) {
                            newPart.text = "";
                        }
                        aggregatedResponse.candidates[candidateIndex].content.parts.push(newPart);
                    }
                }
            }
            candidateIndex++;
        }
        if (response.usageMetadata) {
            aggregatedResponse.usageMetadata = response.usageMetadata;
        }
    }
    return aggregatedResponse;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function generateContentStream(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.STREAM_GENERATE_CONTENT, apiKey, 
    /* stream */ true, JSON.stringify(params), requestOptions);
    return processStream(response);
}
async function generateContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.GENERATE_CONTENT, apiKey, 
    /* stream */ false, JSON.stringify(params), requestOptions);
    const responseJson = await response.json();
    const enhancedResponse = addHelpers(responseJson);
    return {
        response: enhancedResponse,
    };
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function formatSystemInstruction(input) {
    // null or undefined
    if (input == null) {
        return undefined;
    }
    else if (typeof input === "string") {
        return { role: "system", parts: [{ text: input }] };
    }
    else if (input.text) {
        return { role: "system", parts: [input] };
    }
    else if (input.parts) {
        if (!input.role) {
            return { role: "system", parts: input.parts };
        }
        else {
            return input;
        }
    }
}
function formatNewContent(request) {
    let newParts = [];
    if (typeof request === "string") {
        newParts = [{ text: request }];
    }
    else {
        for (const partOrString of request) {
            if (typeof partOrString === "string") {
                newParts.push({ text: partOrString });
            }
            else {
                newParts.push(partOrString);
            }
        }
    }
    return assignRoleToPartsAndValidateSendMessageRequest(newParts);
}
/**
 * When multiple Part types (i.e. FunctionResponsePart and TextPart) are
 * passed in a single Part array, we may need to assign different roles to each
 * part. Currently only FunctionResponsePart requires a role other than 'user'.
 * @private
 * @param parts Array of parts to pass to the model
 * @returns Array of content items
 */
function assignRoleToPartsAndValidateSendMessageRequest(parts) {
    const userContent = { role: "user", parts: [] };
    const functionContent = { role: "function", parts: [] };
    let hasUserContent = false;
    let hasFunctionContent = false;
    for (const part of parts) {
        if ("functionResponse" in part) {
            functionContent.parts.push(part);
            hasFunctionContent = true;
        }
        else {
            userContent.parts.push(part);
            hasUserContent = true;
        }
    }
    if (hasUserContent && hasFunctionContent) {
        throw new GoogleGenerativeAIError("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
    }
    if (!hasUserContent && !hasFunctionContent) {
        throw new GoogleGenerativeAIError("No content is provided for sending chat message.");
    }
    if (hasUserContent) {
        return userContent;
    }
    return functionContent;
}
function formatCountTokensInput(params, modelParams) {
    var _a;
    let formattedGenerateContentRequest = {
        model: modelParams === null || modelParams === void 0 ? void 0 : modelParams.model,
        generationConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.generationConfig,
        safetySettings: modelParams === null || modelParams === void 0 ? void 0 : modelParams.safetySettings,
        tools: modelParams === null || modelParams === void 0 ? void 0 : modelParams.tools,
        toolConfig: modelParams === null || modelParams === void 0 ? void 0 : modelParams.toolConfig,
        systemInstruction: modelParams === null || modelParams === void 0 ? void 0 : modelParams.systemInstruction,
        cachedContent: (_a = modelParams === null || modelParams === void 0 ? void 0 : modelParams.cachedContent) === null || _a === void 0 ? void 0 : _a.name,
        contents: [],
    };
    const containsGenerateContentRequest = params.generateContentRequest != null;
    if (params.contents) {
        if (containsGenerateContentRequest) {
            throw new GoogleGenerativeAIRequestInputError("CountTokensRequest must have one of contents or generateContentRequest, not both.");
        }
        formattedGenerateContentRequest.contents = params.contents;
    }
    else if (containsGenerateContentRequest) {
        formattedGenerateContentRequest = Object.assign(Object.assign({}, formattedGenerateContentRequest), params.generateContentRequest);
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedGenerateContentRequest.contents = [content];
    }
    return { generateContentRequest: formattedGenerateContentRequest };
}
function formatGenerateContentInput(params) {
    let formattedRequest;
    if (params.contents) {
        formattedRequest = params;
    }
    else {
        // Array or string
        const content = formatNewContent(params);
        formattedRequest = { contents: [content] };
    }
    if (params.systemInstruction) {
        formattedRequest.systemInstruction = formatSystemInstruction(params.systemInstruction);
    }
    return formattedRequest;
}
function formatEmbedContentInput(params) {
    if (typeof params === "string" || Array.isArray(params)) {
        const content = formatNewContent(params);
        return { content };
    }
    return params;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// https://ai.google.dev/api/rest/v1beta/Content#part
const VALID_PART_FIELDS = [
    "text",
    "inlineData",
    "functionCall",
    "functionResponse",
    "executableCode",
    "codeExecutionResult",
];
const VALID_PARTS_PER_ROLE = {
    user: ["text", "inlineData"],
    function: ["functionResponse"],
    model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
    // System instructions shouldn't be in history anyway.
    system: ["text"],
};
function validateChatHistory(history) {
    let prevContent = false;
    for (const currContent of history) {
        const { role, parts } = currContent;
        if (!prevContent && role !== "user") {
            throw new GoogleGenerativeAIError(`First content should be with role 'user', got ${role}`);
        }
        if (!POSSIBLE_ROLES.includes(role)) {
            throw new GoogleGenerativeAIError(`Each item should include role field. Got ${role} but valid roles are: ${JSON.stringify(POSSIBLE_ROLES)}`);
        }
        if (!Array.isArray(parts)) {
            throw new GoogleGenerativeAIError("Content should have 'parts' property with an array of Parts");
        }
        if (parts.length === 0) {
            throw new GoogleGenerativeAIError("Each Content should have at least one part");
        }
        const countFields = {
            text: 0,
            inlineData: 0,
            functionCall: 0,
            functionResponse: 0,
            fileData: 0,
            executableCode: 0,
            codeExecutionResult: 0,
        };
        for (const part of parts) {
            for (const key of VALID_PART_FIELDS) {
                if (key in part) {
                    countFields[key] += 1;
                }
            }
        }
        const validParts = VALID_PARTS_PER_ROLE[role];
        for (const key of VALID_PART_FIELDS) {
            if (!validParts.includes(key) && countFields[key] > 0) {
                throw new GoogleGenerativeAIError(`Content with role '${role}' can't contain '${key}' part`);
            }
        }
        prevContent = true;
    }
}
/**
 * Returns true if the response is valid (could be appended to the history), flase otherwise.
 */
function isValidResponse(response) {
    var _a;
    if (response.candidates === undefined || response.candidates.length === 0) {
        return false;
    }
    const content = (_a = response.candidates[0]) === null || _a === void 0 ? void 0 : _a.content;
    if (content === undefined) {
        return false;
    }
    if (content.parts === undefined || content.parts.length === 0) {
        return false;
    }
    for (const part of content.parts) {
        if (part === undefined || Object.keys(part).length === 0) {
            return false;
        }
        if (part.text !== undefined && part.text === "") {
            return false;
        }
    }
    return true;
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do not log a message for this error.
 */
const SILENT_ERROR = "SILENT_ERROR";
/**
 * ChatSession class that enables sending chat messages and stores
 * history of sent and received messages so far.
 *
 * @public
 */
class ChatSession {
    constructor(apiKey, model, params, _requestOptions = {}) {
        this.model = model;
        this.params = params;
        this._requestOptions = _requestOptions;
        this._history = [];
        this._sendPromise = Promise.resolve();
        this._apiKey = apiKey;
        if (params === null || params === void 0 ? void 0 : params.history) {
            validateChatHistory(params.history);
            this._history = params.history;
        }
    }
    /**
     * Gets the chat history so far. Blocked prompts are not added to history.
     * Blocked candidates are not added to history, nor are the prompts that
     * generated them.
     */
    async getHistory() {
        await this._sendPromise;
        return this._history;
    }
    /**
     * Sends a chat message and receives a non-streaming
     * {@link GenerateContentResult}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessage(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        let finalResult;
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => generateContent(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions))
            .then((result) => {
            var _a;
            if (isValidResponse(result.response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({ parts: [], 
                    // Response seems to come back without a role set.
                    role: "model" }, (_a = result.response.candidates) === null || _a === void 0 ? void 0 : _a[0].content);
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(result.response);
                if (blockErrorMessage) {
                    console.warn(`sendMessage() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
            finalResult = result;
        })
            .catch((e) => {
            // Resets _sendPromise to avoid subsequent calls failing and throw error.
            this._sendPromise = Promise.resolve();
            throw e;
        });
        await this._sendPromise;
        return finalResult;
    }
    /**
     * Sends a chat message and receives the response as a
     * {@link GenerateContentStreamResult} containing an iterable stream
     * and a response promise.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async sendMessageStream(request, requestOptions = {}) {
        var _a, _b, _c, _d, _e, _f;
        await this._sendPromise;
        const newContent = formatNewContent(request);
        const generateContentRequest = {
            safetySettings: (_a = this.params) === null || _a === void 0 ? void 0 : _a.safetySettings,
            generationConfig: (_b = this.params) === null || _b === void 0 ? void 0 : _b.generationConfig,
            tools: (_c = this.params) === null || _c === void 0 ? void 0 : _c.tools,
            toolConfig: (_d = this.params) === null || _d === void 0 ? void 0 : _d.toolConfig,
            systemInstruction: (_e = this.params) === null || _e === void 0 ? void 0 : _e.systemInstruction,
            cachedContent: (_f = this.params) === null || _f === void 0 ? void 0 : _f.cachedContent,
            contents: [...this._history, newContent],
        };
        const chatSessionRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        const streamPromise = generateContentStream(this._apiKey, this.model, generateContentRequest, chatSessionRequestOptions);
        // Add onto the chain.
        this._sendPromise = this._sendPromise
            .then(() => streamPromise)
            // This must be handled to avoid unhandled rejection, but jump
            // to the final catch block with a label to not log this error.
            .catch((_ignored) => {
            throw new Error(SILENT_ERROR);
        })
            .then((streamResult) => streamResult.response)
            .then((response) => {
            if (isValidResponse(response)) {
                this._history.push(newContent);
                const responseContent = Object.assign({}, response.candidates[0].content);
                // Response seems to come back without a role set.
                if (!responseContent.role) {
                    responseContent.role = "model";
                }
                this._history.push(responseContent);
            }
            else {
                const blockErrorMessage = formatBlockErrorMessage(response);
                if (blockErrorMessage) {
                    console.warn(`sendMessageStream() was unsuccessful. ${blockErrorMessage}. Inspect response object for details.`);
                }
            }
        })
            .catch((e) => {
            // Errors in streamPromise are already catchable by the user as
            // streamPromise is returned.
            // Avoid duplicating the error message in logs.
            if (e.message !== SILENT_ERROR) {
                // Users do not have access to _sendPromise to catch errors
                // downstream from streamPromise, so they should not throw.
                console.error(e);
            }
        });
        return streamPromise;
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function countTokens(apiKey, model, params, singleRequestOptions) {
    const response = await makeModelRequest(model, Task.COUNT_TOKENS, apiKey, false, JSON.stringify(params), singleRequestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function embedContent(apiKey, model, params, requestOptions) {
    const response = await makeModelRequest(model, Task.EMBED_CONTENT, apiKey, false, JSON.stringify(params), requestOptions);
    return response.json();
}
async function batchEmbedContents(apiKey, model, params, requestOptions) {
    const requestsWithModel = params.requests.map((request) => {
        return Object.assign(Object.assign({}, request), { model });
    });
    const response = await makeModelRequest(model, Task.BATCH_EMBED_CONTENTS, apiKey, false, JSON.stringify({ requests: requestsWithModel }), requestOptions);
    return response.json();
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Class for generative model APIs.
 * @public
 */
class GenerativeModel {
    constructor(apiKey, modelParams, _requestOptions = {}) {
        this.apiKey = apiKey;
        this._requestOptions = _requestOptions;
        if (modelParams.model.includes("/")) {
            // Models may be named "models/model-name" or "tunedModels/model-name"
            this.model = modelParams.model;
        }
        else {
            // If path is not included, assume it's a non-tuned model.
            this.model = `models/${modelParams.model}`;
        }
        this.generationConfig = modelParams.generationConfig || {};
        this.safetySettings = modelParams.safetySettings || [];
        this.tools = modelParams.tools;
        this.toolConfig = modelParams.toolConfig;
        this.systemInstruction = formatSystemInstruction(modelParams.systemInstruction);
        this.cachedContent = modelParams.cachedContent;
    }
    /**
     * Makes a single non-streaming call to the model
     * and returns an object containing a single {@link GenerateContentResponse}.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContent(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContent(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Makes a single streaming call to the model and returns an object
     * containing an iterable stream that iterates over all chunks in the
     * streaming response as well as a promise that returns the final
     * aggregated response.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async generateContentStream(request, requestOptions = {}) {
        var _a;
        const formattedParams = formatGenerateContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return generateContentStream(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, formattedParams), generativeModelRequestOptions);
    }
    /**
     * Gets a new {@link ChatSession} instance which can be used for
     * multi-turn chats.
     */
    startChat(startChatParams) {
        var _a;
        return new ChatSession(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (_a = this.cachedContent) === null || _a === void 0 ? void 0 : _a.name }, startChatParams), this._requestOptions);
    }
    /**
     * Counts the tokens in the provided request.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async countTokens(request, requestOptions = {}) {
        const formattedParams = formatCountTokensInput(request, {
            model: this.model,
            generationConfig: this.generationConfig,
            safetySettings: this.safetySettings,
            tools: this.tools,
            toolConfig: this.toolConfig,
            systemInstruction: this.systemInstruction,
            cachedContent: this.cachedContent,
        });
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return countTokens(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds the provided content.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async embedContent(request, requestOptions = {}) {
        const formattedParams = formatEmbedContentInput(request);
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return embedContent(this.apiKey, this.model, formattedParams, generativeModelRequestOptions);
    }
    /**
     * Embeds an array of {@link EmbedContentRequest}s.
     *
     * Fields set in the optional {@link SingleRequestOptions} parameter will
     * take precedence over the {@link RequestOptions} values provided to
     * {@link GoogleGenerativeAI.getGenerativeModel }.
     */
    async batchEmbedContents(batchEmbedContentRequest, requestOptions = {}) {
        const generativeModelRequestOptions = Object.assign(Object.assign({}, this._requestOptions), requestOptions);
        return batchEmbedContents(this.apiKey, this.model, batchEmbedContentRequest, generativeModelRequestOptions);
    }
}

/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Top-level class for this SDK
 * @public
 */
class GoogleGenerativeAI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    /**
     * Gets a {@link GenerativeModel} instance for the provided model name.
     */
    getGenerativeModel(modelParams, requestOptions) {
        if (!modelParams.model) {
            throw new GoogleGenerativeAIError(`Must provide a model name. ` +
                `Example: genai.getGenerativeModel({ model: 'my-model-name' })`);
        }
        return new GenerativeModel(this.apiKey, modelParams, requestOptions);
    }
    /**
     * Creates a {@link GenerativeModel} instance from provided content cache.
     */
    getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions) {
        if (!cachedContent.name) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `name` field.");
        }
        if (!cachedContent.model) {
            throw new GoogleGenerativeAIRequestInputError("Cached content must contain a `model` field.");
        }
        /**
         * Not checking tools and toolConfig for now as it would require a deep
         * equality comparison and isn't likely to be a common case.
         */
        const disallowedDuplicates = ["model", "systemInstruction"];
        for (const key of disallowedDuplicates) {
            if ((modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) &&
                cachedContent[key] &&
                (modelParams === null || modelParams === void 0 ? void 0 : modelParams[key]) !== cachedContent[key]) {
                if (key === "model") {
                    const modelParamsComp = modelParams.model.startsWith("models/")
                        ? modelParams.model.replace("models/", "")
                        : modelParams.model;
                    const cachedContentComp = cachedContent.model.startsWith("models/")
                        ? cachedContent.model.replace("models/", "")
                        : cachedContent.model;
                    if (modelParamsComp === cachedContentComp) {
                        continue;
                    }
                }
                throw new GoogleGenerativeAIRequestInputError(`Different value for "${key}" specified in modelParams` +
                    ` (${modelParams[key]}) and cachedContent (${cachedContent[key]})`);
            }
        }
        const modelParamsFromCache = Object.assign(Object.assign({}, modelParams), { model: cachedContent.model, tools: cachedContent.tools, toolConfig: cachedContent.toolConfig, systemInstruction: cachedContent.systemInstruction, cachedContent });
        return new GenerativeModel(this.apiKey, modelParamsFromCache, requestOptions);
    }
}

exports.ChatSession = ChatSession;
exports.GenerativeModel = GenerativeModel;
exports.GoogleGenerativeAI = GoogleGenerativeAI;
exports.GoogleGenerativeAIAbortError = GoogleGenerativeAIAbortError;
exports.GoogleGenerativeAIError = GoogleGenerativeAIError;
exports.GoogleGenerativeAIFetchError = GoogleGenerativeAIFetchError;
exports.GoogleGenerativeAIRequestInputError = GoogleGenerativeAIRequestInputError;
exports.GoogleGenerativeAIResponseError = GoogleGenerativeAIResponseError;
exports.POSSIBLE_ROLES = POSSIBLE_ROLES;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 76096:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.version = exports.validate = exports.v7 = exports.v6ToV1 = exports.v6 = exports.v5 = exports.v4 = exports.v3 = exports.v1ToV6 = exports.v1 = exports.stringify = exports.parse = exports.NIL = exports.MAX = void 0;
var max_js_1 = __webpack_require__(10610);
Object.defineProperty(exports, "MAX", ({ enumerable: true, get: function () { return max_js_1.default; } }));
var nil_js_1 = __webpack_require__(18699);
Object.defineProperty(exports, "NIL", ({ enumerable: true, get: function () { return nil_js_1.default; } }));
var parse_js_1 = __webpack_require__(46339);
Object.defineProperty(exports, "parse", ({ enumerable: true, get: function () { return parse_js_1.default; } }));
var stringify_js_1 = __webpack_require__(10413);
Object.defineProperty(exports, "stringify", ({ enumerable: true, get: function () { return stringify_js_1.default; } }));
var v1_js_1 = __webpack_require__(57471);
Object.defineProperty(exports, "v1", ({ enumerable: true, get: function () { return v1_js_1.default; } }));
var v1ToV6_js_1 = __webpack_require__(30458);
Object.defineProperty(exports, "v1ToV6", ({ enumerable: true, get: function () { return v1ToV6_js_1.default; } }));
var v3_js_1 = __webpack_require__(18305);
Object.defineProperty(exports, "v3", ({ enumerable: true, get: function () { return v3_js_1.default; } }));
var v4_js_1 = __webpack_require__(33236);
Object.defineProperty(exports, "v4", ({ enumerable: true, get: function () { return v4_js_1.default; } }));
var v5_js_1 = __webpack_require__(97531);
Object.defineProperty(exports, "v5", ({ enumerable: true, get: function () { return v5_js_1.default; } }));
var v6_js_1 = __webpack_require__(35166);
Object.defineProperty(exports, "v6", ({ enumerable: true, get: function () { return v6_js_1.default; } }));
var v6ToV1_js_1 = __webpack_require__(15382);
Object.defineProperty(exports, "v6ToV1", ({ enumerable: true, get: function () { return v6ToV1_js_1.default; } }));
var v7_js_1 = __webpack_require__(61437);
Object.defineProperty(exports, "v7", ({ enumerable: true, get: function () { return v7_js_1.default; } }));
var validate_js_1 = __webpack_require__(46712);
Object.defineProperty(exports, "validate", ({ enumerable: true, get: function () { return validate_js_1.default; } }));
var version_js_1 = __webpack_require__(42252);
Object.defineProperty(exports, "version", ({ enumerable: true, get: function () { return version_js_1.default; } }));


/***/ }),

/***/ 10610:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = 'ffffffff-ffff-ffff-ffff-ffffffffffff';


/***/ }),

/***/ 53432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(76982);
function md5(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    }
    else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return (0, crypto_1.createHash)('md5').update(bytes).digest();
}
exports["default"] = md5;


/***/ }),

/***/ 29533:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(76982);
exports["default"] = { randomUUID: crypto_1.randomUUID };


/***/ }),

/***/ 18699:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = '00000000-0000-0000-0000-000000000000';


/***/ }),

/***/ 46339:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(46712);
function parse(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    let v;
    return Uint8Array.of((v = parseInt(uuid.slice(0, 8), 16)) >>> 24, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff, (v = parseInt(uuid.slice(9, 13), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(14, 18), 16)) >>> 8, v & 0xff, (v = parseInt(uuid.slice(19, 23), 16)) >>> 8, v & 0xff, ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff, (v / 0x100000000) & 0xff, (v >>> 24) & 0xff, (v >>> 16) & 0xff, (v >>> 8) & 0xff, v & 0xff);
}
exports["default"] = parse;


/***/ }),

/***/ 10199:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;


/***/ }),

/***/ 51101:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(76982);
const rnds8Pool = new Uint8Array(256);
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        (0, crypto_1.randomFillSync)(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, (poolPtr += 16));
}
exports["default"] = rng;


/***/ }),

/***/ 7883:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const crypto_1 = __webpack_require__(76982);
function sha1(bytes) {
    if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
    }
    else if (typeof bytes === 'string') {
        bytes = Buffer.from(bytes, 'utf8');
    }
    return (0, crypto_1.createHash)('sha1').update(bytes).digest();
}
exports["default"] = sha1;


/***/ }),

/***/ 10413:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unsafeStringify = void 0;
const validate_js_1 = __webpack_require__(46712);
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}
exports.unsafeStringify = unsafeStringify;
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset);
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
exports["default"] = stringify;


/***/ }),

/***/ 57471:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV1State = void 0;
const rng_js_1 = __webpack_require__(51101);
const stringify_js_1 = __webpack_require__(10413);
const _state = {};
function v1(options, buf, offset) {
    let bytes;
    const isV6 = options?._v6 ?? false;
    if (options) {
        const optionsKeys = Object.keys(options);
        if (optionsKeys.length === 1 && optionsKeys[0] === '_v6') {
            options = undefined;
        }
    }
    if (options) {
        bytes = v1Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.nsecs, options.clockseq, options.node, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV1State(_state, now, rnds);
        bytes = v1Bytes(rnds, _state.msecs, _state.nsecs, isV6 ? undefined : _state.clockseq, isV6 ? undefined : _state.node, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV1State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.nsecs ??= 0;
    if (now === state.msecs) {
        state.nsecs++;
        if (state.nsecs >= 10000) {
            state.node = undefined;
            state.nsecs = 0;
        }
    }
    else if (now > state.msecs) {
        state.nsecs = 0;
    }
    else if (now < state.msecs) {
        state.node = undefined;
    }
    if (!state.node) {
        state.node = rnds.slice(10, 16);
        state.node[0] |= 0x01;
        state.clockseq = ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    }
    state.msecs = now;
    return state;
}
exports.updateV1State = updateV1State;
function v1Bytes(rnds, msecs, nsecs, clockseq, node, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    nsecs ??= 0;
    clockseq ??= ((rnds[8] << 8) | rnds[9]) & 0x3fff;
    node ??= rnds.slice(10, 16);
    msecs += 12219292800000;
    const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    buf[offset++] = (tl >>> 24) & 0xff;
    buf[offset++] = (tl >>> 16) & 0xff;
    buf[offset++] = (tl >>> 8) & 0xff;
    buf[offset++] = tl & 0xff;
    const tmh = ((msecs / 0x100000000) * 10000) & 0xfffffff;
    buf[offset++] = (tmh >>> 8) & 0xff;
    buf[offset++] = tmh & 0xff;
    buf[offset++] = ((tmh >>> 24) & 0xf) | 0x10;
    buf[offset++] = (tmh >>> 16) & 0xff;
    buf[offset++] = (clockseq >>> 8) | 0x80;
    buf[offset++] = clockseq & 0xff;
    for (let n = 0; n < 6; ++n) {
        buf[offset++] = node[n];
    }
    return buf;
}
exports["default"] = v1;


/***/ }),

/***/ 30458:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(46339);
const stringify_js_1 = __webpack_require__(10413);
function v1ToV6(uuid) {
    const v1Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v6Bytes = _v1ToV6(v1Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v6Bytes) : v6Bytes;
}
exports["default"] = v1ToV6;
function _v1ToV6(v1Bytes) {
    return Uint8Array.of(((v1Bytes[6] & 0x0f) << 4) | ((v1Bytes[7] >> 4) & 0x0f), ((v1Bytes[7] & 0x0f) << 4) | ((v1Bytes[4] & 0xf0) >> 4), ((v1Bytes[4] & 0x0f) << 4) | ((v1Bytes[5] & 0xf0) >> 4), ((v1Bytes[5] & 0x0f) << 4) | ((v1Bytes[0] & 0xf0) >> 4), ((v1Bytes[0] & 0x0f) << 4) | ((v1Bytes[1] & 0xf0) >> 4), ((v1Bytes[1] & 0x0f) << 4) | ((v1Bytes[2] & 0xf0) >> 4), 0x60 | (v1Bytes[2] & 0x0f), v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
}


/***/ }),

/***/ 18305:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const md5_js_1 = __webpack_require__(53432);
const v35_js_1 = __webpack_require__(86930);
var v35_js_2 = __webpack_require__(86930);
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v3(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x30, md5_js_1.default, value, namespace, buf, offset);
}
v3.DNS = v35_js_1.DNS;
v3.URL = v35_js_1.URL;
exports["default"] = v3;


/***/ }),

/***/ 86930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = exports.stringToBytes = void 0;
const parse_js_1 = __webpack_require__(46339);
const stringify_js_1 = __webpack_require__(10413);
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str));
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
exports.stringToBytes = stringToBytes;
exports.DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35(version, hash, value, namespace, buf, offset) {
    const valueBytes = typeof value === 'string' ? stringToBytes(value) : value;
    const namespaceBytes = typeof namespace === 'string' ? (0, parse_js_1.default)(namespace) : namespace;
    if (typeof namespace === 'string') {
        namespace = (0, parse_js_1.default)(namespace);
    }
    if (namespace?.length !== 16) {
        throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    }
    let bytes = new Uint8Array(16 + valueBytes.length);
    bytes.set(namespaceBytes);
    bytes.set(valueBytes, namespaceBytes.length);
    bytes = hash(bytes);
    bytes[6] = (bytes[6] & 0x0f) | version;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v35;


/***/ }),

/***/ 33236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const native_js_1 = __webpack_require__(29533);
const rng_js_1 = __webpack_require__(51101);
const stringify_js_1 = __webpack_require__(10413);
function v4(options, buf, offset) {
    if (native_js_1.default.randomUUID && !buf && !options) {
        return native_js_1.default.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? (0, rng_js_1.default)();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
        offset = offset || 0;
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
        for (let i = 0; i < 16; ++i) {
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(rnds);
}
exports["default"] = v4;


/***/ }),

/***/ 97531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.URL = exports.DNS = void 0;
const sha1_js_1 = __webpack_require__(7883);
const v35_js_1 = __webpack_require__(86930);
var v35_js_2 = __webpack_require__(86930);
Object.defineProperty(exports, "DNS", ({ enumerable: true, get: function () { return v35_js_2.DNS; } }));
Object.defineProperty(exports, "URL", ({ enumerable: true, get: function () { return v35_js_2.URL; } }));
function v5(value, namespace, buf, offset) {
    return (0, v35_js_1.default)(0x50, sha1_js_1.default, value, namespace, buf, offset);
}
v5.DNS = v35_js_1.DNS;
v5.URL = v35_js_1.URL;
exports["default"] = v5;


/***/ }),

/***/ 35166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const stringify_js_1 = __webpack_require__(10413);
const v1_js_1 = __webpack_require__(57471);
const v1ToV6_js_1 = __webpack_require__(30458);
function v6(options, buf, offset) {
    options ??= {};
    offset ??= 0;
    let bytes = (0, v1_js_1.default)({ ...options, _v6: true }, new Uint8Array(16));
    bytes = (0, v1ToV6_js_1.default)(bytes);
    if (buf) {
        for (let i = 0; i < 16; i++) {
            buf[offset + i] = bytes[i];
        }
        return buf;
    }
    return (0, stringify_js_1.unsafeStringify)(bytes);
}
exports["default"] = v6;


/***/ }),

/***/ 15382:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const parse_js_1 = __webpack_require__(46339);
const stringify_js_1 = __webpack_require__(10413);
function v6ToV1(uuid) {
    const v6Bytes = typeof uuid === 'string' ? (0, parse_js_1.default)(uuid) : uuid;
    const v1Bytes = _v6ToV1(v6Bytes);
    return typeof uuid === 'string' ? (0, stringify_js_1.unsafeStringify)(v1Bytes) : v1Bytes;
}
exports["default"] = v6ToV1;
function _v6ToV1(v6Bytes) {
    return Uint8Array.of(((v6Bytes[3] & 0x0f) << 4) | ((v6Bytes[4] >> 4) & 0x0f), ((v6Bytes[4] & 0x0f) << 4) | ((v6Bytes[5] & 0xf0) >> 4), ((v6Bytes[5] & 0x0f) << 4) | (v6Bytes[6] & 0x0f), v6Bytes[7], ((v6Bytes[1] & 0x0f) << 4) | ((v6Bytes[2] & 0xf0) >> 4), ((v6Bytes[2] & 0x0f) << 4) | ((v6Bytes[3] & 0xf0) >> 4), 0x10 | ((v6Bytes[0] & 0xf0) >> 4), ((v6Bytes[0] & 0x0f) << 4) | ((v6Bytes[1] & 0xf0) >> 4), v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
}


/***/ }),

/***/ 61437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateV7State = void 0;
const rng_js_1 = __webpack_require__(51101);
const stringify_js_1 = __webpack_require__(10413);
const _state = {};
function v7(options, buf, offset) {
    let bytes;
    if (options) {
        bytes = v7Bytes(options.random ?? options.rng?.() ?? (0, rng_js_1.default)(), options.msecs, options.seq, buf, offset);
    }
    else {
        const now = Date.now();
        const rnds = (0, rng_js_1.default)();
        updateV7State(_state, now, rnds);
        bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
    }
    return buf ?? (0, stringify_js_1.unsafeStringify)(bytes);
}
function updateV7State(state, now, rnds) {
    state.msecs ??= -Infinity;
    state.seq ??= 0;
    if (now > state.msecs) {
        state.seq = (rnds[6] << 23) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
        state.msecs = now;
    }
    else {
        state.seq = (state.seq + 1) | 0;
        if (state.seq === 0) {
            state.msecs++;
        }
    }
    return state;
}
exports.updateV7State = updateV7State;
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    if (!buf) {
        buf = new Uint8Array(16);
        offset = 0;
    }
    else {
        if (offset < 0 || offset + 16 > buf.length) {
            throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
        }
    }
    msecs ??= Date.now();
    seq ??= ((rnds[6] * 0x7f) << 24) | (rnds[7] << 16) | (rnds[8] << 8) | rnds[9];
    buf[offset++] = (msecs / 0x10000000000) & 0xff;
    buf[offset++] = (msecs / 0x100000000) & 0xff;
    buf[offset++] = (msecs / 0x1000000) & 0xff;
    buf[offset++] = (msecs / 0x10000) & 0xff;
    buf[offset++] = (msecs / 0x100) & 0xff;
    buf[offset++] = msecs & 0xff;
    buf[offset++] = 0x70 | ((seq >>> 28) & 0x0f);
    buf[offset++] = (seq >>> 20) & 0xff;
    buf[offset++] = 0x80 | ((seq >>> 14) & 0x3f);
    buf[offset++] = (seq >>> 6) & 0xff;
    buf[offset++] = ((seq << 2) & 0xff) | (rnds[10] & 0x03);
    buf[offset++] = rnds[11];
    buf[offset++] = rnds[12];
    buf[offset++] = rnds[13];
    buf[offset++] = rnds[14];
    buf[offset++] = rnds[15];
    return buf;
}
exports["default"] = v7;


/***/ }),

/***/ 46712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const regex_js_1 = __webpack_require__(10199);
function validate(uuid) {
    return typeof uuid === 'string' && regex_js_1.default.test(uuid);
}
exports["default"] = validate;


/***/ }),

/***/ 42252:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const validate_js_1 = __webpack_require__(46712);
function version(uuid) {
    if (!(0, validate_js_1.default)(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.slice(14, 15), 16);
}
exports["default"] = version;


/***/ }),

/***/ 18053:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(45466);
const require_utils_async_caller = __webpack_require__(87339);

//#region src/embeddings.ts
var embeddings_exports = {};
require_rolldown_runtime.__export(embeddings_exports, { Embeddings: () => Embeddings });
/**
* An abstract class that provides methods for embedding documents and
* queries using LangChain.
*/
var Embeddings = class {
	/**
	* The async caller should be used by subclasses to make any async calls,
	* which will thus benefit from the concurrency and retry logic.
	*/
	caller;
	constructor(params) {
		this.caller = new require_utils_async_caller.AsyncCaller(params ?? {});
	}
};

//#endregion
exports.Embeddings = Embeddings;
Object.defineProperty(exports, "embeddings_exports", ({
  enumerable: true,
  get: function () {
    return embeddings_exports;
  }
}));
//# sourceMappingURL=embeddings.cjs.map

/***/ }),

/***/ 79694:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(45466);

//#region src/utils/chunk_array.ts
var chunk_array_exports = {};
require_rolldown_runtime.__export(chunk_array_exports, { chunkArray: () => chunkArray });
const chunkArray = (arr, chunkSize) => arr.reduce((chunks, elem, index) => {
	const chunkIndex = Math.floor(index / chunkSize);
	const chunk = chunks[chunkIndex] || [];
	chunks[chunkIndex] = chunk.concat([elem]);
	return chunks;
}, []);

//#endregion
exports.chunkArray = chunkArray;
Object.defineProperty(exports, "chunk_array_exports", ({
  enumerable: true,
  get: function () {
    return chunk_array_exports;
  }
}));
//# sourceMappingURL=chunk_array.cjs.map

/***/ }),

/***/ 84639:
/***/ ((__unused_webpack_module, exports) => {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

exports.__toESM = __toESM;

/***/ }),

/***/ 57999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const require_zod_to_genai_parameters = __webpack_require__(35757);
const require_common = __webpack_require__(19625);
const require_output_parsers = __webpack_require__(40750);
const require_tools = __webpack_require__(60015);
const require_profiles = __webpack_require__(53074);
const __google_generative_ai = require_rolldown_runtime.__toESM(__webpack_require__(97656));
const __langchain_core_utils_env = require_rolldown_runtime.__toESM(__webpack_require__(87286));
const __langchain_core_language_models_chat_models = require_rolldown_runtime.__toESM(__webpack_require__(98268));
const __langchain_core_runnables = require_rolldown_runtime.__toESM(__webpack_require__(45698));
const __langchain_core_utils_types = require_rolldown_runtime.__toESM(__webpack_require__(19501));
const __langchain_core_output_parsers = require_rolldown_runtime.__toESM(__webpack_require__(70512));

//#region src/chat_models.ts
/**
* Google Generative AI chat model integration.
*
* Setup:
* Install `@langchain/google-genai` and set an environment variable named `GOOGLE_API_KEY`.
*
* ```bash
* npm install @langchain/google-genai
* export GOOGLE_API_KEY="your-api-key"
* ```
*
* ## [Constructor args](https://api.js.langchain.com/classes/langchain_google_genai.ChatGoogleGenerativeAI.html#constructor)
*
* ## [Runtime args](https://api.js.langchain.com/interfaces/langchain_google_genai.GoogleGenerativeAIChatCallOptions.html)
*
* Runtime args can be passed as the second argument to any of the base runnable methods `.invoke`. `.stream`, `.batch`, etc.
* They can also be passed via `.withConfig`, or the second arg in `.bindTools`, like shown in the examples below:
*
* ```typescript
* // When calling `.withConfig`, call options should be passed via the first argument
* const llmWithArgsBound = llm.withConfig({
*   stop: ["\n"],
* });
*
* // When calling `.bindTools`, call options should be passed via the second argument
* const llmWithTools = llm.bindTools(
*   [...],
*   {
*     stop: ["\n"],
*   }
* );
* ```
*
* ## Examples
*
* <details open>
* <summary><strong>Instantiate</strong></summary>
*
* ```typescript
* import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
*
* const llm = new ChatGoogleGenerativeAI({
*   model: "gemini-1.5-flash",
*   temperature: 0,
*   maxRetries: 2,
*   // apiKey: "...",
*   // other params...
* });
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Invoking</strong></summary>
*
* ```typescript
* const input = `Translate "I love programming" into French.`;
*
* // Models also accept a list of chat messages or a formatted prompt
* const result = await llm.invoke(input);
* console.log(result);
* ```
*
* ```txt
* AIMessage {
*   "content": "There are a few ways to translate \"I love programming\" into French, depending on the level of formality and nuance you want to convey:\n\n**Formal:**\n\n* **J'aime la programmation.** (This is the most literal and formal translation.)\n\n**Informal:**\n\n* **J'adore programmer.** (This is a more enthusiastic and informal translation.)\n* **J'aime beaucoup programmer.** (This is a slightly less enthusiastic but still informal translation.)\n\n**More specific:**\n\n* **J'aime beaucoup coder.** (This specifically refers to writing code.)\n* **J'aime beaucoup développer des logiciels.** (This specifically refers to developing software.)\n\nThe best translation will depend on the context and your intended audience. \n",
*   "response_metadata": {
*     "finishReason": "STOP",
*     "index": 0,
*     "safetyRatings": [
*       {
*         "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
*         "probability": "NEGLIGIBLE"
*       },
*       {
*         "category": "HARM_CATEGORY_HATE_SPEECH",
*         "probability": "NEGLIGIBLE"
*       },
*       {
*         "category": "HARM_CATEGORY_HARASSMENT",
*         "probability": "NEGLIGIBLE"
*       },
*       {
*         "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
*         "probability": "NEGLIGIBLE"
*       }
*     ]
*   },
*   "usage_metadata": {
*     "input_tokens": 10,
*     "output_tokens": 149,
*     "total_tokens": 159
*   }
* }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Streaming Chunks</strong></summary>
*
* ```typescript
* for await (const chunk of await llm.stream(input)) {
*   console.log(chunk);
* }
* ```
*
* ```txt
* AIMessageChunk {
*   "content": "There",
*   "response_metadata": {
*     "index": 0
*   }
*   "usage_metadata": {
*     "input_tokens": 10,
*     "output_tokens": 1,
*     "total_tokens": 11
*   }
* }
* AIMessageChunk {
*   "content": " are a few ways to translate \"I love programming\" into French, depending on",
* }
* AIMessageChunk {
*   "content": " the level of formality and nuance you want to convey:\n\n**Formal:**\n\n",
* }
* AIMessageChunk {
*   "content": "* **J'aime la programmation.** (This is the most literal and formal translation.)\n\n**Informal:**\n\n* **J'adore programmer.** (This",
* }
* AIMessageChunk {
*   "content": " is a more enthusiastic and informal translation.)\n* **J'aime beaucoup programmer.** (This is a slightly less enthusiastic but still informal translation.)\n\n**More",
* }
* AIMessageChunk {
*   "content": " specific:**\n\n* **J'aime beaucoup coder.** (This specifically refers to writing code.)\n* **J'aime beaucoup développer des logiciels.** (This specifically refers to developing software.)\n\nThe best translation will depend on the context and",
* }
* AIMessageChunk {
*   "content": " your intended audience. \n",
* }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Aggregate Streamed Chunks</strong></summary>
*
* ```typescript
* import { AIMessageChunk } from '@langchain/core/messages';
* import { concat } from '@langchain/core/utils/stream';
*
* const stream = await llm.stream(input);
* let full: AIMessageChunk | undefined;
* for await (const chunk of stream) {
*   full = !full ? chunk : concat(full, chunk);
* }
* console.log(full);
* ```
*
* ```txt
* AIMessageChunk {
*   "content": "There are a few ways to translate \"I love programming\" into French, depending on the level of formality and nuance you want to convey:\n\n**Formal:**\n\n* **J'aime la programmation.** (This is the most literal and formal translation.)\n\n**Informal:**\n\n* **J'adore programmer.** (This is a more enthusiastic and informal translation.)\n* **J'aime beaucoup programmer.** (This is a slightly less enthusiastic but still informal translation.)\n\n**More specific:**\n\n* **J'aime beaucoup coder.** (This specifically refers to writing code.)\n* **J'aime beaucoup développer des logiciels.** (This specifically refers to developing software.)\n\nThe best translation will depend on the context and your intended audience. \n",
*   "usage_metadata": {
*     "input_tokens": 10,
*     "output_tokens": 277,
*     "total_tokens": 287
*   }
* }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Bind tools</strong></summary>
*
* ```typescript
* import { z } from 'zod';
*
* const GetWeather = {
*   name: "GetWeather",
*   description: "Get the current weather in a given location",
*   schema: z.object({
*     location: z.string().describe("The city and state, e.g. San Francisco, CA")
*   }),
* }
*
* const GetPopulation = {
*   name: "GetPopulation",
*   description: "Get the current population in a given location",
*   schema: z.object({
*     location: z.string().describe("The city and state, e.g. San Francisco, CA")
*   }),
* }
*
* const llmWithTools = llm.bindTools([GetWeather, GetPopulation]);
* const aiMsg = await llmWithTools.invoke(
*   "Which city is hotter today and which is bigger: LA or NY?"
* );
* console.log(aiMsg.tool_calls);
* ```
*
* ```txt
* [
*   {
*     name: 'GetWeather',
*     args: { location: 'Los Angeles, CA' },
*     type: 'tool_call'
*   },
*   {
*     name: 'GetWeather',
*     args: { location: 'New York, NY' },
*     type: 'tool_call'
*   },
*   {
*     name: 'GetPopulation',
*     args: { location: 'Los Angeles, CA' },
*     type: 'tool_call'
*   },
*   {
*     name: 'GetPopulation',
*     args: { location: 'New York, NY' },
*     type: 'tool_call'
*   }
* ]
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Structured Output</strong></summary>
*
* ```typescript
* const Joke = z.object({
*   setup: z.string().describe("The setup of the joke"),
*   punchline: z.string().describe("The punchline to the joke"),
*   rating: z.number().optional().describe("How funny the joke is, from 1 to 10")
* }).describe('Joke to tell user.');
*
* const structuredLlm = llm.withStructuredOutput(Joke, { name: "Joke" });
* const jokeResult = await structuredLlm.invoke("Tell me a joke about cats");
* console.log(jokeResult);
* ```
*
* ```txt
* {
*   setup: "Why don\\'t cats play poker?",
*   punchline: "Why don\\'t cats play poker? Because they always have an ace up their sleeve!"
* }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Multimodal</strong></summary>
*
* ```typescript
* import { HumanMessage } from '@langchain/core/messages';
*
* const imageUrl = "https://example.com/image.jpg";
* const imageData = await fetch(imageUrl).then(res => res.arrayBuffer());
* const base64Image = Buffer.from(imageData).toString('base64');
*
* const message = new HumanMessage({
*   content: [
*     { type: "text", text: "describe the weather in this image" },
*     {
*       type: "image_url",
*       image_url: { url: `data:image/jpeg;base64,${base64Image}` },
*     },
*   ]
* });
*
* const imageDescriptionAiMsg = await llm.invoke([message]);
* console.log(imageDescriptionAiMsg.content);
* ```
*
* ```txt
* The weather in the image appears to be clear and sunny. The sky is mostly blue with a few scattered white clouds, indicating fair weather. The bright sunlight is casting shadows on the green, grassy hill, suggesting it is a pleasant day with good visibility. There are no signs of rain or stormy conditions.
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Usage Metadata</strong></summary>
*
* ```typescript
* const aiMsgForMetadata = await llm.invoke(input);
* console.log(aiMsgForMetadata.usage_metadata);
* ```
*
* ```txt
* { input_tokens: 10, output_tokens: 149, total_tokens: 159 }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Response Metadata</strong></summary>
*
* ```typescript
* const aiMsgForResponseMetadata = await llm.invoke(input);
* console.log(aiMsgForResponseMetadata.response_metadata);
* ```
*
* ```txt
* {
*   finishReason: 'STOP',
*   index: 0,
*   safetyRatings: [
*     {
*       category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
*       probability: 'NEGLIGIBLE'
*     },
*     {
*       category: 'HARM_CATEGORY_HATE_SPEECH',
*       probability: 'NEGLIGIBLE'
*     },
*     { category: 'HARM_CATEGORY_HARASSMENT', probability: 'NEGLIGIBLE' },
*     {
*       category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
*       probability: 'NEGLIGIBLE'
*     }
*   ]
* }
* ```
* </details>
*
* <br />
*
* <details>
* <summary><strong>Document Messages</strong></summary>
*
* This example will show you how to pass documents such as PDFs to Google
* Generative AI through messages.
*
* ```typescript
* const pdfPath = "/Users/my_user/Downloads/invoice.pdf";
* const pdfBase64 = await fs.readFile(pdfPath, "base64");
*
* const response = await llm.invoke([
*   ["system", "Use the provided documents to answer the question"],
*   [
*     "user",
*     [
*       {
*         type: "application/pdf", // If the `type` field includes a single slash (`/`), it will be treated as inline data.
*         data: pdfBase64,
*       },
*       {
*         type: "text",
*         text: "Summarize the contents of this PDF",
*       },
*     ],
*   ],
* ]);
*
* console.log(response.content);
* ```
*
* ```txt
* This is a billing invoice from Twitter Developers for X API Basic Access. The transaction date is January 7, 2025,
* and the amount is $194.34, which has been paid. The subscription period is from January 7, 2025 21:02 to February 7, 2025 00:00 (UTC).
* The tax is $0.00, with a tax rate of 0%. The total amount is $194.34. The payment was made using a Visa card ending in 7022,
* expiring in 12/2026. The billing address is Brace Sproul, 1234 Main Street, San Francisco, CA, US 94103. The company being billed is
* X Corp, located at 865 FM 1209 Building 2, Bastrop, TX, US 78602. Terms and conditions apply.
* ```
* </details>
*
* <br />
*/
var ChatGoogleGenerativeAI = class extends __langchain_core_language_models_chat_models.BaseChatModel {
	static lc_name() {
		return "ChatGoogleGenerativeAI";
	}
	lc_serializable = true;
	get lc_secrets() {
		return { apiKey: "GOOGLE_API_KEY" };
	}
	lc_namespace = [
		"langchain",
		"chat_models",
		"google_genai"
	];
	get lc_aliases() {
		return { apiKey: "google_api_key" };
	}
	model;
	temperature;
	maxOutputTokens;
	topP;
	topK;
	stopSequences = [];
	safetySettings;
	apiKey;
	streaming = false;
	json;
	streamUsage = true;
	convertSystemMessageToHumanContent;
	thinkingConfig;
	client;
	get _isMultimodalModel() {
		return this.model.includes("vision") || this.model.startsWith("gemini-1.5") || this.model.startsWith("gemini-2") || this.model.startsWith("gemma-3-") && !this.model.startsWith("gemma-3-1b") || this.model.startsWith("gemini-3");
	}
	constructor(fields) {
		super(fields);
		this.model = fields.model.replace(/^models\//, "");
		this.maxOutputTokens = fields.maxOutputTokens ?? this.maxOutputTokens;
		if (this.maxOutputTokens && this.maxOutputTokens < 0) throw new Error("`maxOutputTokens` must be a positive integer");
		this.temperature = fields.temperature ?? this.temperature;
		if (this.temperature && (this.temperature < 0 || this.temperature > 2)) throw new Error("`temperature` must be in the range of [0.0,2.0]");
		this.topP = fields.topP ?? this.topP;
		if (this.topP && this.topP < 0) throw new Error("`topP` must be a positive integer");
		if (this.topP && this.topP > 1) throw new Error("`topP` must be below 1.");
		this.topK = fields.topK ?? this.topK;
		if (this.topK && this.topK < 0) throw new Error("`topK` must be a positive integer");
		this.stopSequences = fields.stopSequences ?? this.stopSequences;
		this.apiKey = fields.apiKey ?? (0, __langchain_core_utils_env.getEnvironmentVariable)("GOOGLE_API_KEY");
		if (!this.apiKey) throw new Error("Please set an API key for Google GenerativeAI in the environment variable GOOGLE_API_KEY or in the `apiKey` field of the ChatGoogleGenerativeAI constructor");
		this.safetySettings = fields.safetySettings ?? this.safetySettings;
		if (this.safetySettings && this.safetySettings.length > 0) {
			const safetySettingsSet = new Set(this.safetySettings.map((s) => s.category));
			if (safetySettingsSet.size !== this.safetySettings.length) throw new Error("The categories in `safetySettings` array must be unique");
		}
		this.streaming = fields.streaming ?? this.streaming;
		this.json = fields.json;
		this.thinkingConfig = fields.thinkingConfig ?? this.thinkingConfig;
		this.client = new __google_generative_ai.GoogleGenerativeAI(this.apiKey).getGenerativeModel({
			model: this.model,
			safetySettings: this.safetySettings,
			generationConfig: {
				stopSequences: this.stopSequences,
				maxOutputTokens: this.maxOutputTokens,
				temperature: this.temperature,
				topP: this.topP,
				topK: this.topK,
				...this.json ? { responseMimeType: "application/json" } : {},
				...this.thinkingConfig ? { thinkingConfig: this.thinkingConfig } : {}
			}
		}, {
			apiVersion: fields.apiVersion,
			baseUrl: fields.baseUrl
		});
		this.streamUsage = fields.streamUsage ?? this.streamUsage;
	}
	useCachedContent(cachedContent, modelParams, requestOptions) {
		if (!this.apiKey) return;
		this.client = new __google_generative_ai.GoogleGenerativeAI(this.apiKey).getGenerativeModelFromCachedContent(cachedContent, modelParams, requestOptions);
	}
	get useSystemInstruction() {
		return typeof this.convertSystemMessageToHumanContent === "boolean" ? !this.convertSystemMessageToHumanContent : this.computeUseSystemInstruction;
	}
	get computeUseSystemInstruction() {
		if (this.model === "gemini-1.0-pro-001") return false;
		else if (this.model.startsWith("gemini-pro-vision")) return false;
		else if (this.model.startsWith("gemini-1.0-pro-vision")) return false;
		else if (this.model === "gemini-pro") return false;
		return true;
	}
	getLsParams(options) {
		return {
			ls_provider: "google_genai",
			ls_model_name: this.model,
			ls_model_type: "chat",
			ls_temperature: this.client.generationConfig.temperature,
			ls_max_tokens: this.client.generationConfig.maxOutputTokens,
			ls_stop: options.stop
		};
	}
	_combineLLMOutput() {
		return [];
	}
	_llmType() {
		return "googlegenerativeai";
	}
	bindTools(tools, kwargs) {
		return this.withConfig({
			tools: require_tools.convertToolsToGenAI(tools)?.tools,
			...kwargs
		});
	}
	invocationParams(options) {
		const toolsAndConfig = options?.tools?.length ? require_tools.convertToolsToGenAI(options.tools, {
			toolChoice: options.tool_choice,
			allowedFunctionNames: options.allowedFunctionNames
		}) : void 0;
		if (options?.responseSchema) {
			this.client.generationConfig.responseSchema = options.responseSchema;
			this.client.generationConfig.responseMimeType = "application/json";
		} else {
			this.client.generationConfig.responseSchema = void 0;
			this.client.generationConfig.responseMimeType = this.json ? "application/json" : void 0;
		}
		return {
			...toolsAndConfig?.tools ? { tools: toolsAndConfig.tools } : {},
			...toolsAndConfig?.toolConfig ? { toolConfig: toolsAndConfig.toolConfig } : {}
		};
	}
	async _generate(messages, options, runManager) {
		const prompt = require_common.convertBaseMessagesToContent(messages, this._isMultimodalModel, this.useSystemInstruction, this.model);
		let actualPrompt = prompt;
		if (prompt[0].role === "system") {
			const [systemInstruction] = prompt;
			this.client.systemInstruction = systemInstruction;
			actualPrompt = prompt.slice(1);
		}
		const parameters = this.invocationParams(options);
		if (this.streaming) {
			const tokenUsage = {};
			const stream = this._streamResponseChunks(messages, options, runManager);
			const finalChunks = {};
			for await (const chunk of stream) {
				const index = chunk.generationInfo?.completion ?? 0;
				if (finalChunks[index] === void 0) finalChunks[index] = chunk;
				else finalChunks[index] = finalChunks[index].concat(chunk);
			}
			const generations = Object.entries(finalChunks).sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10)).map(([_, value]) => value);
			return {
				generations,
				llmOutput: { estimatedTokenUsage: tokenUsage }
			};
		}
		const res = await this.completionWithRetry({
			...parameters,
			contents: actualPrompt
		});
		let usageMetadata;
		if ("usageMetadata" in res.response) usageMetadata = require_common.convertUsageMetadata(res.response.usageMetadata, this.model);
		const generationResult = require_common.mapGenerateContentResultToChatResult(res.response, { usageMetadata });
		if (generationResult.generations?.length > 0) await runManager?.handleLLMNewToken(generationResult.generations[0]?.text ?? "");
		return generationResult;
	}
	async *_streamResponseChunks(messages, options, runManager) {
		const prompt = require_common.convertBaseMessagesToContent(messages, this._isMultimodalModel, this.useSystemInstruction, this.model);
		let actualPrompt = prompt;
		if (prompt[0].role === "system") {
			const [systemInstruction] = prompt;
			this.client.systemInstruction = systemInstruction;
			actualPrompt = prompt.slice(1);
		}
		const parameters = this.invocationParams(options);
		const request = {
			...parameters,
			contents: actualPrompt
		};
		const stream = await this.caller.callWithOptions({ signal: options?.signal }, async () => {
			const { stream: stream$1 } = await this.client.generateContentStream(request);
			return stream$1;
		});
		let usageMetadata;
		let prevPromptTokenCount = 0;
		let prevCandidatesTokenCount = 0;
		let prevTotalTokenCount = 0;
		let index = 0;
		for await (const response of stream) {
			if ("usageMetadata" in response && response.usageMetadata !== void 0 && this.streamUsage !== false && options.streamUsage !== false) {
				usageMetadata = require_common.convertUsageMetadata(response.usageMetadata, this.model);
				const newPromptTokenCount = response.usageMetadata.promptTokenCount ?? 0;
				usageMetadata.input_tokens = Math.max(0, newPromptTokenCount - prevPromptTokenCount);
				prevPromptTokenCount = newPromptTokenCount;
				const newCandidatesTokenCount = response.usageMetadata.candidatesTokenCount ?? 0;
				usageMetadata.output_tokens = Math.max(0, newCandidatesTokenCount - prevCandidatesTokenCount);
				prevCandidatesTokenCount = newCandidatesTokenCount;
				const newTotalTokenCount = response.usageMetadata.totalTokenCount ?? 0;
				usageMetadata.total_tokens = Math.max(0, newTotalTokenCount - prevTotalTokenCount);
				prevTotalTokenCount = newTotalTokenCount;
			}
			const chunk = require_common.convertResponseContentToChatGenerationChunk(response, {
				usageMetadata,
				index
			});
			index += 1;
			if (!chunk) continue;
			yield chunk;
			await runManager?.handleLLMNewToken(chunk.text ?? "");
		}
	}
	async completionWithRetry(request, options) {
		return this.caller.callWithOptions({ signal: options?.signal }, async () => {
			try {
				return await this.client.generateContent(request);
			} catch (e) {
				if (e.message?.includes("400 Bad Request")) e.status = 400;
				throw e;
			}
		});
	}
	/**
	* Return profiling information for the model.
	*
	* Provides information about the model's capabilities and constraints,
	* including token limits, multimodal support, and advanced features like
	* tool calling and structured output.
	*
	* @returns {ModelProfile} An object describing the model's capabilities and constraints
	*
	* @example
	* ```typescript
	* const model = new ChatGoogleGenerativeAI({ model: "gemini-1.5-flash" });
	* const profile = model.profile;
	* console.log(profile.maxInputTokens); // 2000000
	* console.log(profile.imageInputs); // true
	* ```
	*/
	get profile() {
		return require_profiles.default[this.model] ?? {};
	}
	withStructuredOutput(outputSchema, config) {
		const schema = outputSchema;
		const name = config?.name;
		const method = config?.method;
		const includeRaw = config?.includeRaw;
		if (method === "jsonMode") throw new Error(`ChatGoogleGenerativeAI only supports "jsonSchema" or "functionCalling" as a method.`);
		let llm;
		let outputParser;
		if (method === "functionCalling") {
			let functionName = name ?? "extract";
			let tools;
			if ((0, __langchain_core_utils_types.isInteropZodSchema)(schema)) {
				const jsonSchema = require_zod_to_genai_parameters.schemaToGenerativeAIParameters(schema);
				tools = [{ functionDeclarations: [{
					name: functionName,
					description: jsonSchema.description ?? "A function available to call.",
					parameters: jsonSchema
				}] }];
				outputParser = new require_output_parsers.GoogleGenerativeAIToolsOutputParser({
					returnSingle: true,
					keyName: functionName,
					zodSchema: schema
				});
			} else {
				let geminiFunctionDefinition;
				if (typeof schema.name === "string" && typeof schema.parameters === "object" && schema.parameters != null) {
					geminiFunctionDefinition = schema;
					geminiFunctionDefinition.parameters = require_zod_to_genai_parameters.removeAdditionalProperties(schema.parameters);
					functionName = schema.name;
				} else geminiFunctionDefinition = {
					name: functionName,
					description: schema.description ?? "",
					parameters: require_zod_to_genai_parameters.removeAdditionalProperties(schema)
				};
				tools = [{ functionDeclarations: [geminiFunctionDefinition] }];
				outputParser = new require_output_parsers.GoogleGenerativeAIToolsOutputParser({
					returnSingle: true,
					keyName: functionName
				});
			}
			llm = this.bindTools(tools).withConfig({ allowedFunctionNames: [functionName] });
		} else {
			const jsonSchema = require_zod_to_genai_parameters.schemaToGenerativeAIParameters(schema);
			llm = this.withConfig({ responseSchema: jsonSchema });
			outputParser = new __langchain_core_output_parsers.JsonOutputParser();
		}
		if (!includeRaw) return llm.pipe(outputParser).withConfig({ runName: "ChatGoogleGenerativeAIStructuredOutput" });
		const parserAssign = __langchain_core_runnables.RunnablePassthrough.assign({ parsed: (input, config$1) => outputParser.invoke(input.raw, config$1) });
		const parserNone = __langchain_core_runnables.RunnablePassthrough.assign({ parsed: () => null });
		const parsedWithFallback = parserAssign.withFallbacks({ fallbacks: [parserNone] });
		return __langchain_core_runnables.RunnableSequence.from([{ raw: llm }, parsedWithFallback]).withConfig({ runName: "StructuredOutputRunnable" });
	}
};

//#endregion
exports.ChatGoogleGenerativeAI = ChatGoogleGenerativeAI;
//# sourceMappingURL=chat_models.cjs.map

/***/ }),

/***/ 23938:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const __google_generative_ai = require_rolldown_runtime.__toESM(__webpack_require__(97656));
const __langchain_core_utils_env = require_rolldown_runtime.__toESM(__webpack_require__(87286));
const __langchain_core_embeddings = require_rolldown_runtime.__toESM(__webpack_require__(18053));
const __langchain_core_utils_chunk_array = require_rolldown_runtime.__toESM(__webpack_require__(79694));

//#region src/embeddings.ts
/**
* Class that extends the Embeddings class and provides methods for
* generating embeddings using the Google Palm API.
* @example
* ```typescript
* const model = new GoogleGenerativeAIEmbeddings({
*   apiKey: "<YOUR API KEY>",
*   modelName: "embedding-001",
* });
*
* // Embed a single query
* const res = await model.embedQuery(
*   "What would be a good company name for a company that makes colorful socks?"
* );
* console.log({ res });
*
* // Embed multiple documents
* const documentRes = await model.embedDocuments(["Hello world", "Bye bye"]);
* console.log({ documentRes });
* ```
*/
var GoogleGenerativeAIEmbeddings = class extends __langchain_core_embeddings.Embeddings {
	apiKey;
	modelName = "embedding-001";
	model = "embedding-001";
	taskType;
	title;
	stripNewLines = true;
	maxBatchSize = 100;
	client;
	constructor(fields) {
		super(fields ?? {});
		this.modelName = fields?.model?.replace(/^models\//, "") ?? fields?.modelName?.replace(/^models\//, "") ?? this.modelName;
		this.model = this.modelName;
		this.taskType = fields?.taskType ?? this.taskType;
		this.title = fields?.title ?? this.title;
		if (this.title && this.taskType !== "RETRIEVAL_DOCUMENT") throw new Error("title can only be sepcified with TaskType.RETRIEVAL_DOCUMENT");
		this.apiKey = fields?.apiKey ?? (0, __langchain_core_utils_env.getEnvironmentVariable)("GOOGLE_API_KEY");
		if (!this.apiKey) throw new Error("Please set an API key for Google GenerativeAI in the environmentb variable GOOGLE_API_KEY or in the `apiKey` field of the GoogleGenerativeAIEmbeddings constructor");
		this.client = new __google_generative_ai.GoogleGenerativeAI(this.apiKey).getGenerativeModel({ model: this.model }, { baseUrl: fields?.baseUrl });
	}
	_convertToContent(text) {
		const cleanedText = this.stripNewLines ? text.replace(/\n/g, " ") : text;
		return {
			content: {
				role: "user",
				parts: [{ text: cleanedText }]
			},
			taskType: this.taskType,
			title: this.title
		};
	}
	async _embedQueryContent(text) {
		const req = this._convertToContent(text);
		const res = await this.client.embedContent(req);
		return res.embedding.values ?? [];
	}
	async _embedDocumentsContent(documents) {
		const batchEmbedChunks = (0, __langchain_core_utils_chunk_array.chunkArray)(documents, this.maxBatchSize);
		const batchEmbedRequests = batchEmbedChunks.map((chunk) => ({ requests: chunk.map((doc) => this._convertToContent(doc)) }));
		const responses = await Promise.allSettled(batchEmbedRequests.map((req) => this.client.batchEmbedContents(req)));
		const embeddings = responses.flatMap((res, idx) => {
			if (res.status === "fulfilled") return res.value.embeddings.map((e) => e.values || []);
			else return Array(batchEmbedChunks[idx].length).fill([]);
		});
		return embeddings;
	}
	/**
	* Method that takes a document as input and returns a promise that
	* resolves to an embedding for the document. It calls the _embedText
	* method with the document as the input.
	* @param document Document for which to generate an embedding.
	* @returns Promise that resolves to an embedding for the input document.
	*/
	embedQuery(document) {
		return this.caller.call(this._embedQueryContent.bind(this), document);
	}
	/**
	* Method that takes an array of documents as input and returns a promise
	* that resolves to a 2D array of embeddings for each document. It calls
	* the _embedText method for each document in the array.
	* @param documents Array of documents for which to generate embeddings.
	* @returns Promise that resolves to a 2D array of embeddings for each input document.
	*/
	embedDocuments(documents) {
		return this.caller.call(this._embedDocumentsContent.bind(this), documents);
	}
};

//#endregion
exports.GoogleGenerativeAIEmbeddings = GoogleGenerativeAIEmbeddings;
//# sourceMappingURL=embeddings.cjs.map

/***/ }),

/***/ 45728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_chat_models = __webpack_require__(57999);
const require_embeddings = __webpack_require__(23938);

exports.ChatGoogleGenerativeAI = require_chat_models.ChatGoogleGenerativeAI;
exports.GoogleGenerativeAIEmbeddings = require_embeddings.GoogleGenerativeAIEmbeddings;

/***/ }),

/***/ 40750:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const __langchain_core_utils_types = require_rolldown_runtime.__toESM(__webpack_require__(19501));
const __langchain_core_output_parsers = require_rolldown_runtime.__toESM(__webpack_require__(70512));

//#region src/output_parsers.ts
var GoogleGenerativeAIToolsOutputParser = class extends __langchain_core_output_parsers.BaseLLMOutputParser {
	static lc_name() {
		return "GoogleGenerativeAIToolsOutputParser";
	}
	lc_namespace = [
		"langchain",
		"google_genai",
		"output_parsers"
	];
	returnId = false;
	/** The type of tool calls to return. */
	keyName;
	/** Whether to return only the first tool call. */
	returnSingle = false;
	zodSchema;
	constructor(params) {
		super(params);
		this.keyName = params.keyName;
		this.returnSingle = params.returnSingle ?? this.returnSingle;
		this.zodSchema = params.zodSchema;
	}
	async _validateResult(result) {
		if (this.zodSchema === void 0) return result;
		const zodParsedResult = await (0, __langchain_core_utils_types.interopSafeParseAsync)(this.zodSchema, result);
		if (zodParsedResult.success) return zodParsedResult.data;
		else throw new __langchain_core_output_parsers.OutputParserException(`Failed to parse. Text: "${JSON.stringify(result, null, 2)}". Error: ${JSON.stringify(zodParsedResult.error.issues)}`, JSON.stringify(result, null, 2));
	}
	async parseResult(generations) {
		const tools = generations.flatMap((generation) => {
			const { message } = generation;
			if (!("tool_calls" in message) || !Array.isArray(message.tool_calls)) return [];
			return message.tool_calls;
		});
		if (tools[0] === void 0) throw new Error("No parseable tool calls provided to GoogleGenerativeAIToolsOutputParser.");
		const [tool] = tools;
		const validatedResult = await this._validateResult(tool.args);
		return validatedResult;
	}
};

//#endregion
exports.GoogleGenerativeAIToolsOutputParser = GoogleGenerativeAIToolsOutputParser;
//# sourceMappingURL=output_parsers.cjs.map

/***/ }),

/***/ 53074:
/***/ ((__unused_webpack_module, exports) => {


//#region src/profiles.ts
const PROFILES = {
	"gemini-embedding-001": {
		maxInputTokens: 2048,
		imageInputs: false,
		audioInputs: false,
		pdfInputs: false,
		videoInputs: false,
		maxOutputTokens: 3072,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: false,
		structuredOutput: false
	},
	"gemini-2.5-flash-image": {
		maxInputTokens: 32768,
		imageInputs: true,
		audioInputs: false,
		pdfInputs: false,
		videoInputs: false,
		maxOutputTokens: 32768,
		reasoningOutput: true,
		imageOutputs: true,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: false,
		structuredOutput: false
	},
	"gemini-2.5-flash-preview-05-20": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-flash-lite-latest": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-flash": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-flash-latest": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-pro-preview-05-06": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-flash-preview-tts": {
		maxInputTokens: 8e3,
		imageInputs: false,
		audioInputs: false,
		pdfInputs: false,
		videoInputs: false,
		maxOutputTokens: 16e3,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: true,
		videoOutputs: false,
		toolCalling: false,
		structuredOutput: false
	},
	"gemini-2.0-flash-lite": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 8192,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-live-2.5-flash-preview-native-audio": {
		maxInputTokens: 131072,
		imageInputs: false,
		audioInputs: true,
		pdfInputs: false,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: true,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-2.0-flash": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 8192,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-flash-lite": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-pro-preview-06-05": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-live-2.5-flash": {
		maxInputTokens: 128e3,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: false,
		videoInputs: true,
		maxOutputTokens: 8e3,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: true,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-2.5-flash-lite-preview-06-17": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-2.5-flash-image-preview": {
		maxInputTokens: 32768,
		imageInputs: true,
		audioInputs: false,
		pdfInputs: false,
		videoInputs: false,
		maxOutputTokens: 32768,
		reasoningOutput: true,
		imageOutputs: true,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: false,
		structuredOutput: false
	},
	"gemini-2.5-flash-preview-09-2025": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-2.5-flash-preview-04-17": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-2.5-pro-preview-tts": {
		maxInputTokens: 8e3,
		imageInputs: false,
		audioInputs: false,
		pdfInputs: false,
		videoInputs: false,
		maxOutputTokens: 16e3,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: true,
		videoOutputs: false,
		toolCalling: false,
		structuredOutput: false
	},
	"gemini-2.5-pro": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-1.5-flash": {
		maxInputTokens: 1e6,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: false,
		videoInputs: true,
		maxOutputTokens: 8192,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-1.5-flash-8b": {
		maxInputTokens: 1e6,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: false,
		videoInputs: true,
		maxOutputTokens: 8192,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	},
	"gemini-2.5-flash-lite-preview-09-2025": {
		maxInputTokens: 1048576,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: true,
		videoInputs: true,
		maxOutputTokens: 65536,
		reasoningOutput: true,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: true
	},
	"gemini-1.5-pro": {
		maxInputTokens: 1e6,
		imageInputs: true,
		audioInputs: true,
		pdfInputs: false,
		videoInputs: true,
		maxOutputTokens: 8192,
		reasoningOutput: false,
		imageOutputs: false,
		audioOutputs: false,
		videoOutputs: false,
		toolCalling: true,
		structuredOutput: false
	}
};
var profiles_default = PROFILES;

//#endregion
exports["default"] = profiles_default;
//# sourceMappingURL=profiles.cjs.map

/***/ }),

/***/ 19625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const require_zod_to_genai_parameters = __webpack_require__(35757);
const __langchain_core_messages = require_rolldown_runtime.__toESM(__webpack_require__(79906));
const __langchain_core_outputs = require_rolldown_runtime.__toESM(__webpack_require__(40003));
const __langchain_core_utils_function_calling = require_rolldown_runtime.__toESM(__webpack_require__(11360));
const __langchain_core_language_models_base = require_rolldown_runtime.__toESM(__webpack_require__(13214));
const uuid = require_rolldown_runtime.__toESM(__webpack_require__(76096));

//#region src/utils/common.ts
const _FUNCTION_CALL_THOUGHT_SIGNATURES_MAP_KEY = "__gemini_function_call_thought_signatures__";
const DUMMY_SIGNATURE = "ErYCCrMCAdHtim9kOoOkrPiCNVsmlpMIKd7ZMxgiFbVQOkgp7nlLcDMzVsZwIzvuT7nQROivoXA72ccC2lSDvR0Gh7dkWaGuj7ctv6t7ZceHnecx0QYa+ix8tYpRfjhyWozQ49lWiws6+YGjCt10KRTyWsZ2h6O7iHTYJwKIRwGUHRKy/qK/6kFxJm5ML00gLq4D8s5Z6DBpp2ZlR+uF4G8jJgeWQgyHWVdx2wGYElaceVAc66tZdPQRdOHpWtgYSI1YdaXgVI8KHY3/EfNc2YqqMIulvkDBAnuMhkAjV9xmBa54Tq+ih3Im4+r3DzqhGqYdsSkhS0kZMwte4Hjs65dZzCw9lANxIqYi1DJ639WNPYihp/DCJCos7o+/EeSPJaio5sgWDyUnMGkY1atsJZ+m7pj7DD5tvQ==";
const iife = (fn) => fn();
function getMessageAuthor(message) {
	const type = message._getType();
	if (__langchain_core_messages.ChatMessage.isInstance(message)) return message.role;
	if (type === "tool") return type;
	return message.name ?? type;
}
/**
* Maps a message type to a Google Generative AI chat author.
* @param message The message to map.
* @param model The model to use for mapping.
* @returns The message type mapped to a Google Generative AI chat author.
*/
function convertAuthorToRole(author) {
	switch (author) {
		case "supervisor":
		case "ai":
		case "model": return "model";
		case "system": return "system";
		case "human": return "user";
		case "tool":
		case "function": return "function";
		default: throw new Error(`Unknown / unsupported author: ${author}`);
	}
}
function messageContentMedia(content) {
	if ("mimeType" in content && "data" in content) return { inlineData: {
		mimeType: content.mimeType,
		data: content.data
	} };
	if ("mimeType" in content && "fileUri" in content) return { fileData: {
		mimeType: content.mimeType,
		fileUri: content.fileUri
	} };
	throw new Error("Invalid media content");
}
function inferToolNameFromPreviousMessages(message, previousMessages) {
	return previousMessages.map((msg) => {
		if ((0, __langchain_core_messages.isAIMessage)(msg)) return msg.tool_calls ?? [];
		return [];
	}).flat().find((toolCall) => {
		return toolCall.id === message.tool_call_id;
	})?.name;
}
function _getStandardContentBlockConverter(isMultimodalModel) {
	const standardContentBlockConverter = {
		providerName: "Google Gemini",
		fromStandardTextBlock(block) {
			return { text: block.text };
		},
		fromStandardImageBlock(block) {
			if (!isMultimodalModel) throw new Error("This model does not support images");
			if (block.source_type === "url") {
				const data = (0, __langchain_core_messages.parseBase64DataUrl)({ dataUrl: block.url });
				if (data) return { inlineData: {
					mimeType: data.mime_type,
					data: data.data
				} };
				else return { fileData: {
					mimeType: block.mime_type ?? "",
					fileUri: block.url
				} };
			}
			if (block.source_type === "base64") return { inlineData: {
				mimeType: block.mime_type ?? "",
				data: block.data
			} };
			throw new Error(`Unsupported source type: ${block.source_type}`);
		},
		fromStandardAudioBlock(block) {
			if (!isMultimodalModel) throw new Error("This model does not support audio");
			if (block.source_type === "url") {
				const data = (0, __langchain_core_messages.parseBase64DataUrl)({ dataUrl: block.url });
				if (data) return { inlineData: {
					mimeType: data.mime_type,
					data: data.data
				} };
				else return { fileData: {
					mimeType: block.mime_type ?? "",
					fileUri: block.url
				} };
			}
			if (block.source_type === "base64") return { inlineData: {
				mimeType: block.mime_type ?? "",
				data: block.data
			} };
			throw new Error(`Unsupported source type: ${block.source_type}`);
		},
		fromStandardFileBlock(block) {
			if (!isMultimodalModel) throw new Error("This model does not support files");
			if (block.source_type === "text") return { text: block.text };
			if (block.source_type === "url") {
				const data = (0, __langchain_core_messages.parseBase64DataUrl)({ dataUrl: block.url });
				if (data) return { inlineData: {
					mimeType: data.mime_type,
					data: data.data
				} };
				else return { fileData: {
					mimeType: block.mime_type ?? "",
					fileUri: block.url
				} };
			}
			if (block.source_type === "base64") return { inlineData: {
				mimeType: block.mime_type ?? "",
				data: block.data
			} };
			throw new Error(`Unsupported source type: ${block.source_type}`);
		}
	};
	return standardContentBlockConverter;
}
function _convertLangChainContentToPart(content, isMultimodalModel) {
	if ((0, __langchain_core_messages.isDataContentBlock)(content)) return (0, __langchain_core_messages.convertToProviderContentBlock)(content, _getStandardContentBlockConverter(isMultimodalModel));
	if (content.type === "text") return { text: content.text };
	else if (content.type === "executableCode") return { executableCode: content.executableCode };
	else if (content.type === "codeExecutionResult") return { codeExecutionResult: content.codeExecutionResult };
	else if (content.type === "image_url") {
		if (!isMultimodalModel) throw new Error(`This model does not support images`);
		let source;
		if (typeof content.image_url === "string") source = content.image_url;
		else if (typeof content.image_url === "object" && "url" in content.image_url) source = content.image_url.url;
		else throw new Error("Please provide image as base64 encoded data URL");
		const [dm, data] = source.split(",");
		if (!dm.startsWith("data:")) throw new Error("Please provide image as base64 encoded data URL");
		const [mimeType, encoding] = dm.replace(/^data:/, "").split(";");
		if (encoding !== "base64") throw new Error("Please provide image as base64 encoded data URL");
		return { inlineData: {
			data,
			mimeType
		} };
	} else if (content.type === "media") return messageContentMedia(content);
	else if (content.type === "tool_use") return { functionCall: {
		name: content.name,
		args: content.input
	} };
	else if (content.type?.includes("/") && content.type.split("/").length === 2 && "data" in content && typeof content.data === "string") return { inlineData: {
		mimeType: content.type,
		data: content.data
	} };
	else if ("functionCall" in content) return void 0;
	else if ("type" in content) throw new Error(`Unknown content type ${content.type}`);
	else throw new Error(`Unknown content ${JSON.stringify(content)}`);
}
function convertMessageContentToParts(message, isMultimodalModel, previousMessages, model) {
	if ((0, __langchain_core_messages.isToolMessage)(message)) {
		const messageName = message.name ?? inferToolNameFromPreviousMessages(message, previousMessages);
		if (messageName === void 0) throw new Error(`Google requires a tool name for each tool call response, and we could not infer a called tool name for ToolMessage "${message.id}" from your passed messages. Please populate a "name" field on that ToolMessage explicitly.`);
		const result = Array.isArray(message.content) ? message.content.map((c) => _convertLangChainContentToPart(c, isMultimodalModel)).filter((p) => p !== void 0) : message.content;
		if (message.status === "error") return [{ functionResponse: {
			name: messageName,
			response: { error: { details: result } }
		} }];
		return [{ functionResponse: {
			name: messageName,
			response: { result }
		} }];
	}
	let functionCalls = [];
	const messageParts = [];
	if (typeof message.content === "string" && message.content) messageParts.push({ text: message.content });
	if (Array.isArray(message.content)) messageParts.push(...message.content.map((c) => _convertLangChainContentToPart(c, isMultimodalModel)).filter((p) => p !== void 0));
	const functionThoughtSignatures = message.additional_kwargs?.[_FUNCTION_CALL_THOUGHT_SIGNATURES_MAP_KEY];
	if ((0, __langchain_core_messages.isAIMessage)(message) && message.tool_calls?.length) functionCalls = message.tool_calls.map((tc) => {
		const thoughtSignature = iife(() => {
			if (tc.id) {
				const signature = functionThoughtSignatures?.[tc.id];
				if (signature) return signature;
			}
			if (model?.includes("gemini-3")) return DUMMY_SIGNATURE;
			return "";
		});
		return {
			functionCall: {
				name: tc.name,
				args: tc.args
			},
			...thoughtSignature ? { thoughtSignature } : {}
		};
	});
	return [...messageParts, ...functionCalls];
}
function convertBaseMessagesToContent(messages, isMultimodalModel, convertSystemMessageToHumanContent = false, model) {
	return messages.reduce((acc, message, index) => {
		if (!(0, __langchain_core_messages.isBaseMessage)(message)) throw new Error("Unsupported message input");
		const author = getMessageAuthor(message);
		if (author === "system" && index !== 0) throw new Error("System message should be the first one");
		const role = convertAuthorToRole(author);
		const prevContent = acc.content[acc.content.length];
		if (!acc.mergeWithPreviousContent && prevContent && prevContent.role === role) throw new Error("Google Generative AI requires alternate messages between authors");
		const parts = convertMessageContentToParts(message, isMultimodalModel, messages.slice(0, index), model);
		if (acc.mergeWithPreviousContent) {
			const prevContent$1 = acc.content[acc.content.length - 1];
			if (!prevContent$1) throw new Error("There was a problem parsing your system message. Please try a prompt without one.");
			prevContent$1.parts.push(...parts);
			return {
				mergeWithPreviousContent: false,
				content: acc.content
			};
		}
		let actualRole = role;
		if (actualRole === "function" || actualRole === "system" && !convertSystemMessageToHumanContent) actualRole = "user";
		const content = {
			role: actualRole,
			parts
		};
		return {
			mergeWithPreviousContent: author === "system" && !convertSystemMessageToHumanContent,
			content: [...acc.content, content]
		};
	}, {
		content: [],
		mergeWithPreviousContent: false
	}).content;
}
function mapGenerateContentResultToChatResult(response, extra) {
	if (!response.candidates || response.candidates.length === 0 || !response.candidates[0]) return {
		generations: [],
		llmOutput: { filters: response.promptFeedback }
	};
	const [candidate] = response.candidates;
	const { content: candidateContent,...generationInfo } = candidate;
	const functionCalls = candidateContent.parts.reduce((acc, p) => {
		if ("functionCall" in p && p.functionCall) acc.push({
			...p,
			id: "id" in p.functionCall && typeof p.functionCall.id === "string" ? p.functionCall.id : (0, uuid.v4)()
		});
		return acc;
	}, []);
	let content;
	if (Array.isArray(candidateContent?.parts) && candidateContent.parts.length === 1 && candidateContent.parts[0].text) content = candidateContent.parts[0].text;
	else if (Array.isArray(candidateContent?.parts) && candidateContent.parts.length > 0) content = candidateContent.parts.map((p) => {
		if ("text" in p) return {
			type: "text",
			text: p.text
		};
		else if ("inlineData" in p) return {
			type: "inlineData",
			inlineData: p.inlineData
		};
		else if ("functionCall" in p) return {
			type: "functionCall",
			functionCall: p.functionCall
		};
		else if ("functionResponse" in p) return {
			type: "functionResponse",
			functionResponse: p.functionResponse
		};
		else if ("fileData" in p) return {
			type: "fileData",
			fileData: p.fileData
		};
		else if ("executableCode" in p) return {
			type: "executableCode",
			executableCode: p.executableCode
		};
		else if ("codeExecutionResult" in p) return {
			type: "codeExecutionResult",
			codeExecutionResult: p.codeExecutionResult
		};
		return p;
	});
	else content = [];
	const functionThoughtSignatures = functionCalls?.reduce((acc, fc) => {
		if ("thoughtSignature" in fc && typeof fc.thoughtSignature === "string") acc[fc.id] = fc.thoughtSignature;
		return acc;
	}, {});
	let text = "";
	if (typeof content === "string") text = content;
	else if (Array.isArray(content) && content.length > 0) {
		const block = content.find((b) => "text" in b);
		text = block?.text ?? text;
	}
	const generation = {
		text,
		message: new __langchain_core_messages.AIMessage({
			content: content ?? "",
			tool_calls: functionCalls?.map((fc) => ({
				type: "tool_call",
				id: fc.id,
				name: fc.functionCall.name,
				args: fc.functionCall.args
			})),
			additional_kwargs: {
				...generationInfo,
				[_FUNCTION_CALL_THOUGHT_SIGNATURES_MAP_KEY]: functionThoughtSignatures
			},
			usage_metadata: extra?.usageMetadata
		}),
		generationInfo
	};
	return {
		generations: [generation],
		llmOutput: { tokenUsage: {
			promptTokens: extra?.usageMetadata?.input_tokens,
			completionTokens: extra?.usageMetadata?.output_tokens,
			totalTokens: extra?.usageMetadata?.total_tokens
		} }
	};
}
function convertResponseContentToChatGenerationChunk(response, extra) {
	if (!response.candidates || response.candidates.length === 0) return null;
	const [candidate] = response.candidates;
	const { content: candidateContent,...generationInfo } = candidate;
	const functionCalls = candidateContent.parts.reduce((acc, p) => {
		if ("functionCall" in p && p.functionCall) acc.push({
			...p,
			id: "id" in p.functionCall && typeof p.functionCall.id === "string" ? p.functionCall.id : (0, uuid.v4)()
		});
		return acc;
	}, []);
	let content;
	if (Array.isArray(candidateContent?.parts) && candidateContent.parts.every((p) => "text" in p)) content = candidateContent.parts.map((p) => p.text).join("");
	else if (Array.isArray(candidateContent?.parts)) content = candidateContent.parts.map((p) => {
		if ("text" in p) return {
			type: "text",
			text: p.text
		};
		else if ("inlineData" in p) return {
			type: "inlineData",
			inlineData: p.inlineData
		};
		else if ("functionCall" in p) return {
			type: "functionCall",
			functionCall: p.functionCall
		};
		else if ("functionResponse" in p) return {
			type: "functionResponse",
			functionResponse: p.functionResponse
		};
		else if ("fileData" in p) return {
			type: "fileData",
			fileData: p.fileData
		};
		else if ("executableCode" in p) return {
			type: "executableCode",
			executableCode: p.executableCode
		};
		else if ("codeExecutionResult" in p) return {
			type: "codeExecutionResult",
			codeExecutionResult: p.codeExecutionResult
		};
		return p;
	});
	else content = [];
	let text = "";
	if (content && typeof content === "string") text = content;
	else if (Array.isArray(content)) {
		const block = content.find((b) => "text" in b);
		text = block?.text ?? "";
	}
	const toolCallChunks = [];
	if (functionCalls) toolCallChunks.push(...functionCalls.map((fc) => ({
		type: "tool_call_chunk",
		id: fc.id,
		name: fc.functionCall.name,
		args: JSON.stringify(fc.functionCall.args)
	})));
	const functionThoughtSignatures = functionCalls?.reduce((acc, fc) => {
		if ("thoughtSignature" in fc && typeof fc.thoughtSignature === "string") acc[fc.id] = fc.thoughtSignature;
		return acc;
	}, {});
	return new __langchain_core_outputs.ChatGenerationChunk({
		text,
		message: new __langchain_core_messages.AIMessageChunk({
			content: content || "",
			name: !candidateContent ? void 0 : candidateContent.role,
			tool_call_chunks: toolCallChunks,
			additional_kwargs: { [_FUNCTION_CALL_THOUGHT_SIGNATURES_MAP_KEY]: functionThoughtSignatures },
			response_metadata: { model_provider: "google-genai" },
			usage_metadata: extra.usageMetadata
		}),
		generationInfo
	});
}
function convertToGenerativeAITools(tools) {
	if (tools.every((tool) => "functionDeclarations" in tool && Array.isArray(tool.functionDeclarations))) return tools;
	return [{ functionDeclarations: tools.map((tool) => {
		if ((0, __langchain_core_utils_function_calling.isLangChainTool)(tool)) {
			const jsonSchema = require_zod_to_genai_parameters.schemaToGenerativeAIParameters(tool.schema);
			if (jsonSchema.type === "object" && "properties" in jsonSchema && Object.keys(jsonSchema.properties).length === 0) return {
				name: tool.name,
				description: tool.description
			};
			return {
				name: tool.name,
				description: tool.description,
				parameters: jsonSchema
			};
		}
		if ((0, __langchain_core_language_models_base.isOpenAITool)(tool)) return {
			name: tool.function.name,
			description: tool.function.description ?? `A function available to call.`,
			parameters: require_zod_to_genai_parameters.jsonSchemaToGeminiParameters(tool.function.parameters)
		};
		return tool;
	}) }];
}
function convertUsageMetadata(usageMetadata, model) {
	const output = {
		input_tokens: usageMetadata?.promptTokenCount ?? 0,
		output_tokens: usageMetadata?.candidatesTokenCount ?? 0,
		total_tokens: usageMetadata?.totalTokenCount ?? 0
	};
	if (usageMetadata?.cachedContentTokenCount) {
		output.input_token_details ??= {};
		output.input_token_details.cache_read = usageMetadata.cachedContentTokenCount;
	}
	if (model === "gemini-3-pro-preview") {
		const over200k = Math.max(0, usageMetadata?.promptTokenCount ?? -2e5);
		const cachedOver200k = Math.max(0, usageMetadata?.cachedContentTokenCount ?? -2e5);
		if (over200k) output.input_token_details = {
			...output.input_token_details,
			over_200k: over200k
		};
		if (cachedOver200k) output.input_token_details = {
			...output.input_token_details,
			cache_read_over_200k: cachedOver200k
		};
	}
	return output;
}

//#endregion
exports.convertBaseMessagesToContent = convertBaseMessagesToContent;
exports.convertResponseContentToChatGenerationChunk = convertResponseContentToChatGenerationChunk;
exports.convertToGenerativeAITools = convertToGenerativeAITools;
exports.convertUsageMetadata = convertUsageMetadata;
exports.mapGenerateContentResultToChatResult = mapGenerateContentResultToChatResult;
//# sourceMappingURL=common.cjs.map

/***/ }),

/***/ 60015:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const require_zod_to_genai_parameters = __webpack_require__(35757);
const require_common = __webpack_require__(19625);
const __google_generative_ai = require_rolldown_runtime.__toESM(__webpack_require__(97656));
const __langchain_core_utils_function_calling = require_rolldown_runtime.__toESM(__webpack_require__(11360));
const __langchain_core_language_models_base = require_rolldown_runtime.__toESM(__webpack_require__(13214));

//#region src/utils/tools.ts
function convertToolsToGenAI(tools, extra) {
	const genAITools = processTools(tools);
	const toolConfig = createToolConfig(genAITools, extra);
	return {
		tools: genAITools,
		toolConfig
	};
}
function processTools(tools) {
	let functionDeclarationTools = [];
	const genAITools = [];
	tools.forEach((tool) => {
		if ((0, __langchain_core_utils_function_calling.isLangChainTool)(tool)) {
			const [convertedTool] = require_common.convertToGenerativeAITools([tool]);
			if (convertedTool.functionDeclarations) functionDeclarationTools.push(...convertedTool.functionDeclarations);
		} else if ((0, __langchain_core_language_models_base.isOpenAITool)(tool)) {
			const { functionDeclarations } = convertOpenAIToolToGenAI(tool);
			if (functionDeclarations) functionDeclarationTools.push(...functionDeclarations);
			else throw new Error("Failed to convert OpenAI structured tool to GenerativeAI tool");
		} else genAITools.push(tool);
	});
	const genAIFunctionDeclaration = genAITools.find((t) => "functionDeclarations" in t);
	if (genAIFunctionDeclaration) return genAITools.map((tool) => {
		if (functionDeclarationTools?.length > 0 && "functionDeclarations" in tool) {
			const newTool = { functionDeclarations: [...tool.functionDeclarations || [], ...functionDeclarationTools] };
			functionDeclarationTools = [];
			return newTool;
		}
		return tool;
	});
	return [...genAITools, ...functionDeclarationTools.length > 0 ? [{ functionDeclarations: functionDeclarationTools }] : []];
}
function convertOpenAIToolToGenAI(tool) {
	return { functionDeclarations: [{
		name: tool.function.name,
		description: tool.function.description,
		parameters: require_zod_to_genai_parameters.removeAdditionalProperties(tool.function.parameters)
	}] };
}
function createToolConfig(genAITools, extra) {
	if (!genAITools.length || !extra) return void 0;
	const { toolChoice, allowedFunctionNames } = extra;
	const modeMap = {
		any: __google_generative_ai.FunctionCallingMode.ANY,
		auto: __google_generative_ai.FunctionCallingMode.AUTO,
		none: __google_generative_ai.FunctionCallingMode.NONE
	};
	if (toolChoice && [
		"any",
		"auto",
		"none"
	].includes(toolChoice)) return { functionCallingConfig: {
		mode: modeMap[toolChoice] ?? "MODE_UNSPECIFIED",
		allowedFunctionNames
	} };
	if (typeof toolChoice === "string" || allowedFunctionNames) return { functionCallingConfig: {
		mode: __google_generative_ai.FunctionCallingMode.ANY,
		allowedFunctionNames: [...allowedFunctionNames ?? [], ...toolChoice && typeof toolChoice === "string" ? [toolChoice] : []]
	} };
	return void 0;
}

//#endregion
exports.convertToolsToGenAI = convertToolsToGenAI;
//# sourceMappingURL=tools.cjs.map

/***/ }),

/***/ 35757:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const require_rolldown_runtime = __webpack_require__(84639);
const __langchain_core_utils_types = require_rolldown_runtime.__toESM(__webpack_require__(19501));
const __langchain_core_utils_json_schema = require_rolldown_runtime.__toESM(__webpack_require__(66723));

//#region src/utils/zod_to_genai_parameters.ts
function removeAdditionalProperties(obj) {
	if (typeof obj === "object" && obj !== null) {
		const newObj = { ...obj };
		if ("additionalProperties" in newObj) delete newObj.additionalProperties;
		if ("$schema" in newObj) delete newObj.$schema;
		if ("strict" in newObj) delete newObj.strict;
		for (const key in newObj) if (key in newObj) {
			if (Array.isArray(newObj[key])) newObj[key] = newObj[key].map(removeAdditionalProperties);
			else if (typeof newObj[key] === "object" && newObj[key] !== null) newObj[key] = removeAdditionalProperties(newObj[key]);
		}
		return newObj;
	}
	return obj;
}
function schemaToGenerativeAIParameters(schema) {
	const jsonSchema = removeAdditionalProperties((0, __langchain_core_utils_types.isInteropZodSchema)(schema) ? (0, __langchain_core_utils_json_schema.toJsonSchema)(schema) : schema);
	const { $schema,...rest } = jsonSchema;
	return rest;
}
function jsonSchemaToGeminiParameters(schema) {
	const jsonSchema = removeAdditionalProperties(schema);
	const { $schema,...rest } = jsonSchema;
	return rest;
}

//#endregion
exports.jsonSchemaToGeminiParameters = jsonSchemaToGeminiParameters;
exports.removeAdditionalProperties = removeAdditionalProperties;
exports.schemaToGenerativeAIParameters = schemaToGenerativeAIParameters;
//# sourceMappingURL=zod_to_genai_parameters.cjs.map

/***/ })

};
;