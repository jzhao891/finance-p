cd ../
call mvn dependency:copy-dependencies -DoutputDirectory=temp.lib  -DincludeScope=runtime
:end
pause