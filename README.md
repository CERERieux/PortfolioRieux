Welcome to my repository where I store my portfolio!
(I’ll start working to deploy this on Cloudflare Pages or Next.js just to learn another file structure. Coming Soon.)

This was developed through TDD, FreeCodeCamp is always giving you tests to complete with each exercise and from some point I had to do the testing myself, so if you wonder why this portfolio hasn't any tests, it is because all stayed there!
Though, I’ll be working to pass those tests here soon.
(I’ll use this opportunity to learn Jest. I already know Mocha-Chai so it shouldn’t be difficult to convert my old test to Jest.)

The structure I tried to use was MVC, so the files for each exercise that is Full Stack maybe is a bit hard to follow, for that reason I’ll list where you can find the code for each one:

Code Dandelion:
    Main Menu & External Profile:
        View: src/client/components/MyProfile & /ExternalProfile
        Controller: src/server/controllers/global.ts from line 7-15, 76-92
        Model: src/server/models/global.ts from line 14-29. 89-109
        Hook: src/client/hooks/useProfile.ts
    Notes:
        View: src/client/components/ExTracker
        Controller: src/server/controllers/basic.ts from line 119-203
        Model: src/server/models/basic.ts from line 219-413
        Hook: src/client/hooks/useExercise.ts
    Personal Shortener URL:
        View: src/client/components/Url
        Controller: src/server/controllers/basic.ts from line 53-118
        Model: src/server/models/basic.ts from line 19-218
        Hook: src/client/hooks/useUrlProfile.ts
    Issue Tracker:
        View: src/client/components/IssueBoard/Profile
        Controller: src/server/controllers/advanced.ts from line 213-330
        Model: src/server/models/advanced.ts from line 735-960
        Hook: src/client/hooks/useProfileIssues.ts
    Library:
        View: src/client/components/Library
        Controller: src/server/controllers/advanced.ts from line 331-505
        Model: src/server/models/advanced.ts from line 961-1260
        Hook: src/client/hooks/useBooks.ts & useSingleBook.ts
    Shortener URL
        View: src/client/components/ShortenerUrl
        Controller: src/server/controllers/basic.ts from line 53-118
        Model: src/server/models/basic.ts from line 19-218
    Sudoku
        View: src/client/components/Games/Sudoku
        Controller: src/server/controllers/advanced.ts from line 83-181
        Model: src/server/models/advanced.ts from line 197-517
        Zustand Store: src/client/store/sudoku.ts
    Demo Projects:
        Pomodoro Clock:
            View: src/client/components/Pomodoro
            Zustand Store: src/client/store/clock.ts
            Hook: src/client/hooks/useTimerClock.ts
        UK-USA Translator:
            View: src/client/components/TranslatorEng
            Controller: src/server/controllers/advanced.ts from line 182-210
            Model: src/server/models/advanced.ts from line 518-733
            Hook: src/client/hooks/useTranslator.ts
        Markdown Parser:
            View: src/client/components/Mark_down
            Hook: src/client/hooks/useMarkdown.ts
        Calculator:
            View: src/client/components/Calculator
            Zustand Store: src/client/store/calculator.ts
        Unit Converter:
            View: src/client/components/ConverterUnit
            Controller: src/server/controllers/advanced.ts from line 43-81
            Model: src/server/models/advanced.ts from line 35-196
            Hook: src/client/hooks/useConverter.ts
        Drum Machine:
            View: src/client/components/DM
        Quote Machine:
            View: src/client/components/Quotes
            Hook: src/client/hooks/useQuote.ts
        Stock Viewer (Omitted):
            View: src/client/components/Stocks
            Controller: src/server/controllers/advancedMisc.ts from line 18-36
            Model: src/server/models/advanced.ts from line 31-244
            Hook: src/client/hooks/useStockViewer.ts
        AnonBoard (Omitted):
            View: src/client/components/AnonBoard
            Controller: src/server/controllers/advancedMisc.ts from line 39-234
            Model: src/server/models/advanced.ts from line 245-656
            Hook: src/client/hooks/useAnonBoard.ts & /useAnonThread.ts & /useAnonReply.ts
        Request Header Data (Omitted):
            View: src/client/components/DataRequest
            Controller: src/server/controllers/basic.ts from line 16-50
    Corner of Issues & Suggestions:
        View: src/client/components/IssueBoard/Users
        Controller: src/server/controllers/advanced.ts from line 213-330
        Model: src/server/models/advanced.ts from line 735-960
        Hook: src/client/hooks/useIssues.ts
    Login Page
        View: src/client/components/Login
        Controller: src/server/controllers/global.ts from line 17-74
        Model: src/server/models/global.ts from line 31-87
        Hook: src/client/hooks/useLogin.ts
        Zustand Store: src/client/store/user.ts
    Home Page
        View: src/client/components/Home
        Zustand Store: src/client/store/settingPortfolio.ts
    i18n
        Hook: src/client/hooks/useLanguage.ts
    System Design
        View: src/client/components/SystemDesign
    404 and Error Pages
        View: src/client/components/NotFound
        Controller: src/server/controllers/error.ts
    Icons
        View: src/client/components/Icons
    Menu Sidebar
        View: src/client/components/Icons

    The folder “Services” is to fetch from the backend the data I need to show in some components.
    The folder “Database” is where I connect with mongoose to MongoDB.
    The folder “Middleware” is where I watch if the user is connected or not and depending on some pages, I reject the connection.
    The folder “Routes” is where I keep my backend endpoints.
    The folder “Schemas” is where I keep the schema of each DB table.
    The folder “types” is where I save the types I need to use typescript with my code, also types.d.ts in client.

I hope with this list you can look at the part you are interested in!
Anyway, you can contact me through my LinkedIn profile. Thanks for reading.
